from flask import Blueprint, request, make_response, jsonify, app
from functools import wraps
import hmac
import hashlib
from urllib.parse import unquote

bp = Blueprint('api', __name__, url_prefix='/api')


def hmac_256(key: str | bytes, value: str | bytes, as_hex: bool = False) -> str | bytes:
    """Makes HMAX digest of key, value as bytes or a hex string"""
    if isinstance(key, str):
        key = key.encode()
    if isinstance(value, str):
        value = value.encode()
    if as_hex: return hmac.new(key, value, 'sha256').hexdigest()
    return hmac.digest(key, value, 'sha256')


def hmac_validate(digest1: str | bytes, digest2: str | bytes) -> bool:
    """Validates a pair of HMAC hashes - must use this instead of simple == for security reasons!"""
    if type(digest1) != type(digest2): return False
    return hmac.compare_digest(digest1, digest2)


def validate_web_app(initdata: str) -> bool:
    # see https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
    their_hash = None
    vals = sorted(initdata.split('&'))
    for val in vals:
        if val.startswith('hash='):
            their_hash = val.split('=')[1].strip() or None
            vals.remove(val)
            break
    if not their_hash: return False
    initdata = '\n'.join(vals)
    secret_key = hmac_256('WebAppData', app.config.get('BOT_TOKEN'))
    my_hash = hmac_256(secret_key, initdata, True)
    return hmac_validate(my_hash, their_hash)
    

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
        return view(**kwargs)

    return wrapped_view
        
        
@bp.route('/', methods=['POST'])
@token_required
def index():
    print(request.json)
    return 'fuck'