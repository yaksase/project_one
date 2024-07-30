from flask import Blueprint, request, make_response, jsonify, app
from functools import wraps
import hmac
import hashlib
from urllib.parse import unquote

bp = Blueprint('api', __name__, url_prefix='/api')


def validate_init_data(init_data):
    token = app.config.get('BOT_TOKEN')
    init_data = sorted([chunk.split("=") 
        for chunk in unquote(init_data).split("&") 
            if chunk[:len("hash=")]!="hash="],
        key=lambda x: x[0])
    print(init_data)
    init_data = "\n".join([f"{rec[0]}={rec[1]}" for rec in init_data])

    secret_key = hmac.new("WebAppData".encode(), token.encode(),
        hashlib.sha256).digest()
    data_check = hmac.new( secret_key, init_data.encode(),
        hashlib.sha256)
    


def token_required(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        init_data = None
        # ensure the init_data passed with the headers
        if 'authorization' in request.headers:
            init_data = request.headers['authorization']
        if not init_data:
            return make_response(jsonify({'message', 'Init data is missing'}), 401)
        

@bp.route('/', methods=['POST'])
def validate():
    print(request.json)
    return 'fuck'