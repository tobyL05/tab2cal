from flask import Blueprint, request
from PIL import Image
from io import BytesIO
from .gemini import get_csv_from_img
import base64


upload_bp = Blueprint("upload",__name__)

@upload_bp.route("/upload", methods=["POST"])
def upload():
    imgb64 = request.get_json()['image']
    img = Image.open(BytesIO(base64.b64decode(imgb64.split(",")[1])))
    get_csv_from_img(img)
    return "success"
