from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
from requests.auth import HTTPBasicAuth
import os
import supabase
import requests

load_dotenv()
# Initialize the Flask app.
app = Flask(__name__)
#Initialize the CORS extension and specify the allowed origins
cors_url = os.getenv("ORIGIN_URL")
# Cors origin
CORS(app, resources={r"/*": {"origins": cors_url}})


SUPABASE_KEY = os.getenv('SUPABASE_KEY')
SUPABASE_URL = os.getenv('SUPABASE_URL')

PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID')
PAYPAL_SECRET_KEY = os.getenv('PAYPAL_SECRET_KEY')

# Initialize the Supabase client.
client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

# Function to verify the user.
def verify_email_signup(email):

    # Get the domain from the email address.
    domain = email.split('@')[1]

    # Query the database for all domains that are marked as disposable.
    result = client.from_('domains').select('*').eq('disposable_emails', domain).execute()

    # If the domain is found, the email address is disposable and cannot be used to create a user.
    if len(result.data) > 0:
        return False
    else:
        return True
    
@app.route("/")
def initialize():
    return jsonify({"message": "Hello, world!"})

# Define a route for retrieving all users from the database.
@app.route('/users', methods=['GET'])
def get_users():

    # Query the database for all users.
    result = client.from_('users').select("*").execute()

    # Return the results as JSON.
    return jsonify(result.get("data"))

# Define a route for verifying an email address.
@app.route('/verify_email', methods=['POST'])
def verify_email():

    # Get the email address from the request.
    user_data = request.get_json()
    email = user_data['email']

    # Verify the email address.
    if verify_email_signup(email) is False:
        # The email address is disposable, so return an error.
        return jsonify({'message': False}), 200
    else:
        # The email address is valid, so return a success message.
        return jsonify({'message': True}), 200

# Define a route for creating a new user.
@app.route("/create_user", methods=["POST"])
def create_user():

    # Get the user data from the request.
    user_data = request.get_json()

    # Verify the email address.
    if verify_email_signup(user_data["email"]) is False:
        # The email address is disposable, so return an error.
        return jsonify({"message": False}), 400
    else:
        # The email address is valid, so create the user.
        email = user_data["email"]
        password = user_data["password"]
        result = client.auth.sign_up({
            "email": email,
            "password": password,
        })
        users_table = client.table("users")
        user_db = {
            "email": email,
            "name": user_data["name"],
        }
        users_table.insert(user_db).execute()
        return jsonify({"res": "Success"}), 200
    
@app.route("/support_email", methods=["POST"])
def support_email():
    data = request.get_json()
    email = data["Email"]


    # Set up the email message
    msg = MIMEMultipart()
    msg['From'] = 'team1blacklist@gmail.com'
    msg['To'] = email
    msg['Subject'] = 'Confirmacion de cita'
    body = f'Tu cita se ha agendado para la fecha {data["Date"]}\n\n Gracias por elegirnos.\n Cordialmente, el equipo de TeamBlock.'
    msg.attach(MIMEText(body, 'plain'))

    # Connect to the SMTP server
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('team1blacklist@gmail.com', os.getenv("EMAIL_PASSWORD"))

    # Send the email
    text = msg.as_string()
    server.sendmail('team1blacklist@gmail.com', email, text)

    # Close the connection to the SMTP server
    server.quit()

    return jsonify({"message": "Email sent"}), 200

@app.route("/resend_magic_link", methods=["POST"])
def resend_magic_link():
    sent_email = request.get_json()
    email = sent_email["email"]
    url = "https://api.supabase.io/v1/auth/magic-link"
    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    data = {
        "email": email,
    }

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        return jsonify({"message":'Magic link sent successfully'}), 200
    else:
        return jsonify({"message": f"Failed to send magic link: {response.status_code}"}), 500

#PayPal

def generateToken():
    """Generate access token"""
    url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    data = {"grant_type": "client_credentials"}
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    response = requests.post(url, auth=HTTPBasicAuth(PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY),data=data, headers=headers)

    response = response.json()
    return response['access_token']

# @app.after_request
# def add_cors(response):
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
#     return response
   
@app.route('/create_order', methods=['POST'])
def create_order():
    access_token = generateToken()
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(
            "https://api.sandbox.paypal.com/v2/checkout/orders", json=request.get_json(), headers=headers)
        data = response.json()
        link = data['links'][1]['href']
        return jsonify(link)
    
    except requests.exceptions.HTTPError as err:
        error_message = err.response.json()['message']
        return jsonify({'error': error_message}), err.response.status_code

#When the order is complete
@app.route('/complete_order')
def complete_order():
    """"""
    id_order = request.args.get('token')
    access_token = generateToken()
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    try:
        response = requests.post(
            f"https://api.sandbox.paypal.com/v2/checkout/orders/{id_order}/capture", None, headers=headers)
        return jsonify(response.json())
    except requests.exceptions.HTTPError as err:
        error_message = err.response.json()['message']
        return jsonify({'error': error_message}), err.response.status_code

# Run the app.
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
