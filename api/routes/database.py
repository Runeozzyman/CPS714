from bson import ObjectId
from flask import Blueprint, jsonify, request, current_app

data_bp = Blueprint('data', __name__)

@data_bp.route('/api/database', methods=['GET'])
def get_data():
    mongo = current_app.extensions['pymongo']
    data = list(mongo.db.your_collection.find({}, {'_id': 0}))  # Example query
    return jsonify(data)

@data_bp.route('/api/database', methods=['POST'])
def add_data():
    mongo = current_app.extensions['pymongo']
    new_data = request.json
    mongo.db.your_collection.insert_one(new_data)
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
