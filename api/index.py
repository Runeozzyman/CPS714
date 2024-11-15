from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from routes.home import home_bp  # Import the home blueprint
from routes.login import login  # Import the login blueprint
from routes.python import python_bp
from routes.username import username_bp
from routes.database import create_data_bp  # Import the function to create the blueprint

# Instance of App
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from http://localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# MongoDB configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/CPS714"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# Register Blueprints
app.register_blueprint(home_bp)
app.register_blueprint(login(mongo, bcrypt))
app.register_blueprint(python_bp)
app.register_blueprint(username_bp)
app.register_blueprint(create_data_bp(mongo, bcrypt))  # Pass the PyMongo and Bcrypt instances to the blueprint

if __name__ == '__main__':  # To enable debug mode
    app.run(port=8080, debug=True)