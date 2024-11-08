from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

#instance of App
app = Flask(__name__)
CORS(app)

@app.route("/api/home", methods=['GET'])
def Backend():
    current_time = datetime.now().strftime("%H:%M:%S")
    return jsonify({
        'message': f"Greetings from the Backend at {current_time}",
    })

@app.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # Add your authentication logic here
    if username == "admin" and password == "password":  # Example check
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__=='__main__': #To enable debug mode
    app.run(debug=True, port=8080)