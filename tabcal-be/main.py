from flask import Flask
from flask_cors import CORS
from routes.index import api_bp


app = Flask(__name__)
app.register_blueprint(api_bp)
cors = CORS(app)

@app.route("/")
def home():
    return "hello world"
