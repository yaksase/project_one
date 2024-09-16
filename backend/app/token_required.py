from flask import request, make_response, jsonify, current_app
from functools import wraps
import hmac
import time
import hashlib
from urllib.parse import unquote
import json

from app.db import get_db
from app.parameters import TOKEN_EXPIRATION


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
        try:
            d = {k: v for k, v in map(lambda i: i.split('='), unquote(initdata).split('&'))}
        except ValueError as e:
            return make_response(jsonify({'message': f'Init data is malformed'}), 401)

        try:
            hash = d.pop('hash')
            auth_date = d['auth_date']
            user = json.loads(d['user'])
        except KeyError as e:
            return make_response(jsonify({'message': f'Missing {e.args[0]} property'}), 401)
        processed_initdata = '\n'.join(sorted([f'{k}={v}' for k, v in d.items()]))

        secret_key = hmac.new("WebAppData".encode(), current_app.config.get('BOT_TOKEN').encode(), hashlib.sha256).digest()
        data_check = hmac.new(secret_key, processed_initdata.encode(), hashlib.sha256)

        if data_check.hexdigest() != hash:
            return make_response(jsonify({'message': 'Init data is not valid'}), 401)

        try:
            token_age = int(time.time()) - int(auth_date)
            print(token_age)
        except ValueError:
            return make_response(jsonify({'message': 'Auth date is incorrect'}), 401)

        if token_age > TOKEN_EXPIRATION:
            return make_response(jsonify({'message': 'Init data has been expired'}), 401)
        
        try:
            last_name = user['last_name']
        except KeyError:
            last_name = ''

        current_user = get_db().execute('SELECT * FROM user WHERE id = ?', (user['id'],)).fetchone()
        if current_user is None:
            get_db().execute('INSERT INTO user (id, name) VALUES (?, ?)', (user['id'], f'{user['first_name']} {last_name}'))
            get_db().commit()
            current_user = get_db().execute('SELECT * FROM user WHERE id = ?', (user['id'],)).fetchone()
        # Maybe we should add token age check so that only most recent entrances are checked for updates
        elif current_user[1] != f'{user['first_name']} {last_name}':
            get_db().execute('UPDATE user SET name = ? WHERE id = ?', (f'{user['first_name']} {last_name}', user['id']))
            get_db().commit()

        return view(current_user, **kwargs)

    return wrapped_view