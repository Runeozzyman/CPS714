from flask import Blueprint, jsonify, request
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

def login(mongo: PyMongo, bcrypt: Bcrypt):
    login_bp = Blueprint('login', __name__)

    def verify_password(mongo: PyMongo, bcrypt: Bcrypt, username: str, password: str):
        # Query the database for the user
        user = mongo.db.Users.find_one({'username': username})

        if user:
            # Get the stored hashed password
            stored_password = user.get('password')

            # Debugging: Print the stored password and the provided password
            print(f"Stored password: {stored_password}")
            print(f"Provided password: {password}")

            # Verify the provided password against the stored hashed password
            if bcrypt.check_password_hash(stored_password, password):
                return True, "Login successful"
            else:
                return False, "Invalid password"
        else:
            return False, "User not found"

    @login_bp.route("/api/login", methods=['POST'])
    def reqLogin():
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Verify the password using the function from services
        is_valid, message = verify_password(mongo, bcrypt, username, password)

        if is_valid:
            return jsonify({'message': message}), 200
        else:
            return jsonify({'message': message}), 401

    return login_bp