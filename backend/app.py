from flask import Flask, jsonify
import supabase

app = Flask(__name__)

# Initialize Supabase client
supabase_client = supabase.create_client(
    "https://<YOUR_SUPABASE_URL>.supabase.co",
    "<YOUR_SUPABASE_KEY>"
)

# Define a route for retrieving all users from the database
@app.route('/users', methods=['GET'])
def get_users():
    # Query the database for all users and retrieve the results
    query = "SELECT * FROM users"
    response = supabase_client.query(query)

    # If the query was successful, return the users as JSON
    if response['status'] == 200:
        users = response['data']
        return jsonify(users)
    else:
        # If there was an error, return an error message
        error_message = response['error']['message']
        return jsonify({"error": error_message}), 500

if __name__ == '__main__':
    app.run()