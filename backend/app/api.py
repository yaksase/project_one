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
    amount = abs(request.args.get('amount', default=0, type=int))
    update_tons(current_user['id'], amount)
    return make_response(jsonify({'message': 'Succesful deposit'}), 200)


# Rework when linked with TON
@bp.route('/withdraw', methods=['PUT'])
@token_required
def withdraw(current_user):
    amount = abs(request.args.get('amount', default=0, type=int))
    update_tons(current_user['id'], -amount)
    return make_response(jsonify({'message': 'Succesful withdraw'}), 200)


@bp.route('/leaderboard', methods=['GET'])
@token_required
def get_leaderboard(current_user):
    leaderboard = get_db().execute('SELECT *\
                    FROM user\
                    ORDER BY tokens DESC, name ASC\
                    LIMIT 100;').fetchall()
    return jsonify([dict(user) for user in leaderboard])


@bp.route('/free_pc', methods=['GET'])
@token_required
def get_free_pc_amount(current_user):
    total_free_pcs = get_db().execute('SELECT COUNT(*) FROM pc WHERE is_free = TRUE').fetchone()[0]
    return jsonify({'amount': MAX_FREE_PCS - total_free_pcs})