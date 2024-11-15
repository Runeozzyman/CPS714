from bson import ObjectId
from flask import Blueprint, jsonify, request
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import globals

def create_data_bp(mongo: PyMongo, bcrypt: Bcrypt):
    data_bp = Blueprint('data', __name__)

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

        # Debugging: Print the hashed password
        print(f"Hashed password: {hashed_password}")

        # Create the new entry
        entry = {
            'fullname': fullname,
            'username': username,
            'email': email,
            'password': hashed_password,
            'phone': phone,
            'role': role,
            'loyaltypoints': loyaltypoints,
            'company': company
        }

        # Insert the new entry into the database
        mongo.db.Users.insert_one(entry)
        globals.logged_in_username = username
        return jsonify({'message': 'Data added successfully'}), 201

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

    return data_bp