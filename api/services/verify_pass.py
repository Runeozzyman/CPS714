import bcrypt
from flask import current_app

def verify_password(username: str, password: str):
    mongo = current_app.extensions['pymongo']
    
    # Query the database for the user
    user = mongo.db.your_collection.find_one({'username': username})

    if user:
        # Get the stored hashed password
        stored_password = user.get('password')
        
        # Verify the provided password against the stored hashed password
        if bcrypt.checkpw(password.encode('utf-8'), stored_password):
            return True, "Login successful"
        else:
            return False, "Invalid password"
    else:
        return False, "User not found"