import bcrypt
from bson import ObjectId
from flask import Blueprint, jsonify, request, current_app
from api.services.verify_pass import verify_password

data_bp = Blueprint('data', __name__)

@data_bp.route('/api/database/validuser?', methods=['POST'])
def validate_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Verify the password using the function from services
    is_valid, message = verify_password(username, password)

    if is_valid:
        return jsonify({'message': message}), 200
    else:
        return jsonify({'message': message}), 401

@data_bp.route('/api/database', methods=['POST'])
def add_data():
    mongo = current_app.extensions['pymongo']
    new_data = request.json



    # Extract the fields from the incoming data
    fullname = new_data.get('fullname')
    username = new_data.get('username')
    email = new_data.get('email')
    password = new_data.get('password')
    phone: int = new_data.get('phone')
    role = new_data.get('role')
    loyaltypoints:int = new_data.get('loyaltypoints', 0)# Set Default to 0 value for loyaltypoints if not provided
    hashed_password =  bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())# Hash the password using the encrypt_password function

    # Create the new entry
    entry = {
        'fullname':fullname,
        'username': username,
        'email': email,
        'password': hashed_password,
        'phone': phone,
        'role': role,
        'loyaltypoints': loyaltypoints  
    }

    # Insert the new entry into the database
    mongo.db.your_collection.insert_one(entry)
    return jsonify({'message': 'Data added successfully'}), 201

@data_bp.route('/api/database/<id>', methods=['PUT'])
def update_data(id):
    mongo = current_app.extensions['pymongo']
    updated_data = request.json
    mongo.db.your_collection.update_one({'_id': ObjectId(id)}, {'$set': updated_data})
    return jsonify({'message': 'Data updated successfully'}), 200

@data_bp.route('/api/database/<id>', methods=['DELETE'])
def delete_data(id):
    mongo = current_app.extensions['pymongo']
    mongo.db.your_collection.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Data deleted successfully'}), 200

@data_bp.route('/api/database/companies', methods=['GET'])
def get_unique_companies():
    mongo = current_app.extensions['pymongo']
    companies = mongo.db.your_collection.distinct('company')
    return jsonify({'companies': companies}), 200