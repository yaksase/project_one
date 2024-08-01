from flask import Blueprint, request, make_response, jsonify, current_app
from functools import wraps
import hmac
import time
import hashlib
from urllib.parse import unquote

bp = Blueprint('api', __name__, url_prefix='/api')


def token_required(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        init_data = None
        # ensure the init_data passed with the headers
        if 'authorization' in request.headers:
            init_data = request.headers['authorization']
        if not init_data:
            return make_response(jsonify({'message': 'Init data is missing'}), 401)
        auth_data = init_data.split(' ')
        if len(auth_data) != 2:
            return make_response(jsonify({'message': 'Init data is incorrect'}), 401)
        if auth_data[0] != 'tma':
            return make_response(jsonify({'message': 'Auth method is incorrect'}), 401)
        
        initdata = auth_data[1]
        hash = ''
        auth_date = '0'
        sorted_data = []
        for chunk in sorted(unquote(initdata).split("&")):
            if chunk[:len("hash=")] == "hash=":
                hash = chunk[len("hash="):]
            elif chunk[:len("auth_date=")] == "auth_date=":
                auth_date = chunk[len("auth_date="):]
                sorted_data.append(chunk)
            else:
                sorted_data.append(chunk)
        processed_initdata = '\n'.join(sorted_data)

        secret_key = hmac.new("WebAppData".encode(), current_app.config.get('BOT_TOKEN').encode(), hashlib.sha256).digest()
        data_check = hmac.new(secret_key, processed_initdata.encode(), hashlib.sha256)

        if data_check.hexdigest() != hash:
            return make_response(jsonify({'message': 'Init data is not valid'}), 401)
            
        try:
            token_age = int(time.time()) - int(auth_date)
        except ValueError:
            return make_response(jsonify({'message': 'Auth date is incorrect'}), 401)

        if token_age > current_app.config.get('TOKEN_EXPIRATION'):
            return make_response(jsonify({'message': 'Init data has been expired'}), 401)
        
        return view(**kwargs)

    return wrapped_view
        
        
@bp.route('/', methods=['POST'])
@token_required
def index():
    print(request.json)
    return 'fuck'