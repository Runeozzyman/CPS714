from flask import Blueprint

python_bp = Blueprint('python', __name__)

@python_bp.route("/api/python")
def Welcome():
    return "<p>Hello, World!</p>"