from flask import Blueprint, jsonify
import globals

username_bp = Blueprint('username', __name__)

@username_bp.route("/api/username", methods=['GET'])
def get_username():
    if globals.logged_in_username:
        return jsonify({'username': globals.logged_in_username}), 200
    else:
        return jsonify({'message': 'No username found'}), 404