from flask import Blueprint, jsonify, request
import globals

login_bp = Blueprint('login', __name__)

@login_bp.route("/api/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    # Add your authentication logic here
    if username == "admin" and password == "password":  # Example check
        globals.logged_in_username = username
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401