from flask import Flask, request, jsonify
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)

PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID')
PAYPAL_SECRET_KEY = os.getenv('PAYPAL_SECRET_KEY')

def generateToken():
    """Generate access token"""
    url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    data = "grant_type=client_credentials"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    response = requests.post(url, auth=HTTPBasicAuth(PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY),data=data, headers=headers)

    response = response.json()
    return response['access_token']

@app.after_request
def add_cors(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
   
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

@app.route('/complete_order')
def complete_order():
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
    app.run(debug=True)