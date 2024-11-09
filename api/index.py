from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from routes.home import home_bp
from routes.login import login_bp
from routes.python import python_bp
from routes.username import username_bp
from routes.database import data_bp  # Import the new blueprint

# Instance of App
app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(home_bp)
app.register_blueprint(login_bp)
app.register_blueprint(python_bp)
app.register_blueprint(username_bp)
app.register_blueprint(data_bp)  # Register the new blueprint

if __name__ == '__main__':  # To enable debug mode
    app.run(port=8080, debug=True)