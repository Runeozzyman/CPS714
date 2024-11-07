from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime

#instance of App
app = Flask(__name__)
CORS(app)

@app.route("/api/home", methods=['GET'])
def Backend():
    current_time = datetime.now().strftime("%H:%M:%S")
    return jsonify({
        'message': f"Greetings from the Backend at {current_time}",
    })

if __name__=='__main__': #To enable debug mode
    app.run(debug=True, port=8080)