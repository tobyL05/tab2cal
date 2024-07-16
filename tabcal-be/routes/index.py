from .generate import handleGenerate
from flask import Blueprint, request

api_bp = Blueprint("api",__name__)

@api_bp.route("/generate", methods=["POST"])
def generate():
    return handleGenerate(request)
