from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

# Instance of App
app = Flask(__name__)
CORS(app)

# Global variable to store the username
logged_in_username = None

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/home", methods=['GET'])
def Backend():
    current_time = datetime.now().strftime("%H:%M:%S")
    return jsonify({
        'message': f"Response from the Backend at {current_time}",
    })

@app.route("/api/login", methods=['POST'])
def login():
    global logged_in_username
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # Add your authentication logic here
    if username == "admin" and password == "password":  # Example check
        logged_in_username = username
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route("/api/username", methods=['GET'])
def get_username():
    if logged_in_username:
        return jsonify({'username': logged_in_username}), 200
    else:
        return jsonify({'message': 'No username found'}), 404

if __name__ == '__main__':  # To enable debug mode
    app.run(port=8080, debug=True)