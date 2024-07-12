from .generate import handleGenerate
from .login import handleLogin, handleAuth
from flask import Blueprint, request

api_bp = Blueprint("api",__name__)

@api_bp.route("/generate", methods=["POST"])
def generate():
    return handleGenerate(request)

@api_bp.route("/login", methods=["POST"])
def login():
    return handleLogin(request)

@api_bp.route("/auth/callback", methods=["GET"])
def auth_cb():
    return handleAuth(request)