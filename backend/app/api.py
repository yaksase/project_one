from flask import Blueprint, request, make_response, jsonify
from functools import wraps
import hmac
import time
import hashlib
import json
from urllib.parse import unquote

from app.db import get_db, update_tons
from app import inventory, mint
from app.token_required import token_required
from app.parameters import MAX_FREE_PCS

bp = Blueprint('api', __name__, url_prefix='/api')

bp.register_blueprint(inventory.bp)
bp.register_blueprint(mint.bp)

        
@bp.route('/me', methods=['GET'])
@token_required
def get_user(current_user):
    return jsonify(dict(current_user))


# Rework when linked with TON
@bp.route('/deposit', methods=['PUT'])
@token_required
def deposit(current_user):
    """
    params:
    - amount <int>

    does:
    increase TON for current user by *amount*

    returns:
    - [200] if Succesful deposit
    """
    amount = abs(request.args.get('amount', default=0, type=int))
    update_tons(current_user['id'], amount)
    return make_response(jsonify({'message': 'Succesful deposit'}), 200)


# Rework when linked with TON
@bp.route('/withdraw', methods=['PUT'])
@token_required
def withdraw(current_user):
    """
    params:
    - amount <int>

    does:
    reduce TON for current user by *amount*

    returns:
    - [200] if Succesful withdrawal
    - [400] if Not enough TON
    """
    amount = abs(request.args.get('amount', default=0, type=int))
    if current_user['tons'] < amount:
        return make_response(jsonify({'message': 'Not enough TON'}), 400)
    update_tons(current_user['id'], -amount)
    return make_response(jsonify({'message': 'Succesful withdrawal'}), 200)


@bp.route('/leaderboard', methods=['GET'])
@token_required
def get_leaderboard(current_user):
    """
    does:
    get top 100 users by token count. Sorted by token count (DESC) and by username (ASC)

    returns:
    - [200] array of users(*{id: int, name: string, tokens: int, tons: int}*)
    """
    leaderboard = get_db().execute('SELECT *\
                    FROM user\
                    ORDER BY tokens DESC, name ASC\
                    LIMIT 100;').fetchall()
    return jsonify([dict(user) for user in leaderboard])


@bp.route('/free_pc', methods=['GET'])
@token_required
def get_free_pc_amount(current_user):
    """
    does:
    get amount of free PCs that are ready to be claimed by users

    returns:
    - [200] amount *{amount: int}*
    """
    total_free_pcs = get_db().execute('SELECT COUNT(*) FROM pc WHERE is_free = TRUE').fetchone()[0]
    return jsonify({'amount': MAX_FREE_PCS - total_free_pcs})