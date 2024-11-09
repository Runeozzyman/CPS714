from flask import Blueprint, jsonify
from datetime import datetime

home_bp = Blueprint('home', __name__)

@home_bp.route("/api/home", methods=['GET'])
def Backend():
    current_time = datetime.now().strftime("%H:%M:%S")
    return jsonify({
        'message': f"Response from the Backend at {current_time}",
    })