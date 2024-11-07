from flask import Flask, jsonify
from flask_cors import CORS
#instance of App
app = Flask(__name__)
CORS(app)
@app.route("/api/home", methods=['GET'])
def Backend():
    return jsonify ({
        'message':"Hello To The World!"
    })

if __name__=='__main__': #To enable debug mode
    app.run(debug=True, port=8080)