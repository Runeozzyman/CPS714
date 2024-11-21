from bson import ObjectId
from flask import Blueprint, jsonify, request
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import globals
import secrets
import hashlib
import datetime
import requests

def create_data_bp(mongo: PyMongo, bcrypt: Bcrypt):
    data_bp = Blueprint('data', __name__)

    def send_verification_email(email, token, user_id):
        verification_link = f"http://localhost:3000/verify-email?verifyToken={token}&id={user_id}"
        message = f"Please verify your email by clicking the following link: {verification_link}"

        payload = {
            'userEmail': email,
            'subject': 'Email Verification',
            'message': message
        }

        try:
            response = requests.post('http://localhost:3001/api/send-email', json=payload)
            response.raise_for_status()
            print("Verification email sent successfully")
        except requests.exceptions.RequestException as e:
            print(f"Failed to send verification email: {e}")

    @data_bp.route('/api/database', methods=['POST'])
    def add_data():
        new_data = request.json

        # Extract the fields from the incoming data
        fullname = new_data.get('fullname')
        username = new_data.get('username')
        email = new_data.get('email')
        password = new_data.get('password')
        phone = new_data.get('phone')
        role = new_data.get('role')
        loyaltypoints = new_data.get('loyaltypoints', 0)  # Set Default to 0 value for loyaltypoints if not provided
        company = new_data.get('company', "")  # Set Default to empty string if not provided
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')  # Hash the password using Flask-Bcrypt

        # Generate verification token
        verification_token = secrets.token_hex(20)
        hashed_verification_token = hashlib.sha256(verification_token.encode()).hexdigest()
        verification_token_expire = datetime.datetime.now() + datetime.timedelta(minutes=30)

        # Create the new entry
        entry = {
            'fullname': fullname,
            'username': username,
            'email': email,
            'password': hashed_password,
            'phone': phone,
            'role': role,
            'loyaltypoints': loyaltypoints,
            'company': company,
            'isVerified': False,
            'verifyToken': hashed_verification_token,
            'verifyTokenExpire': verification_token_expire
        }

        # Insert the new entry into the database
        result = mongo.db.Users.insert_one(entry)
        user_id = result.inserted_id

        # Send verification email
        send_verification_email(email, verification_token, user_id)

        globals.logged_in_username = username
        return jsonify({'message': 'Data added successfully. Please verify your email.'}), 201

    @data_bp.route('/api/database/<id>', methods=['PUT'])
    def update_data(id):
        updated_data = request.json
        mongo.db.Users.update_one({'_id': ObjectId(id)}, {'$set': updated_data})
        return jsonify({'message': 'Data updated successfully'}), 200

    @data_bp.route('/api/database/<id>', methods=['DELETE'])
    def delete_data(id):
        mongo.db.Users.delete_one({'_id': ObjectId(id)})
        return jsonify({'message': 'Data deleted successfully'}), 200

    @data_bp.route('/api/database/companies', methods=['GET'])
    def get_unique_companies():
        companies = mongo.db.Users.distinct('company')
        return jsonify({'companies': companies}), 200

    @data_bp.route('/api/verify-email', methods=['GET'])
    def verify_email():
        token = request.args.get('verifyToken')
        user_id = request.args.get('id')

        hashed_token = hashlib.sha256(token.encode()).hexdigest()
        user = mongo.db.Users.find_one({
            '_id': ObjectId(user_id),
            'verifyToken': hashed_token,
            'verifyTokenExpire': {'$gt': datetime.datetime.now()}
        })

        if not user:
            return jsonify({'message': 'Invalid or expired token'}), 400

        mongo.db.Users.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {'isVerified': True}, '$unset': {'verifyToken': '', 'verifyTokenExpire': ''}}
        )

        return jsonify({'message': 'Email verified successfully'}), 200

    return data_bp