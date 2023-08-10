from config import SUPABASE_KEY, SUPABASE_URL
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import supabase
import requests

# Initialize the Flask app.
app = Flask(__name__)

#Initialize the CORS extension and specify the allowed origins
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5173",
                             "methods": ["GET", "POST", "PUT", "DELETE"],
                             "allow_headers": ["Content-Type", "Authorization"]}})
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
    print(response.content)

    if response.status_code == 200:
        return jsonify({"message":'Magic link sent successfully'}), 200
    else:
        return jsonify({"message": f"Failed to send magic link: {response.status_code}"}), 500


# Run the app.
if __name__ == '__main__':
    app.run(debug=True)
