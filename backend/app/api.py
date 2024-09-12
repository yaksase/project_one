from flask import Blueprint, request, make_response, jsonify, current_app
from functools import wraps
import hmac
import time
import hashlib
import json
from urllib.parse import unquote

from app.db import get_db
from app import inventory
from app.token_required import token_required

bp = Blueprint('api', __name__, url_prefix='/api')
bp.register_blueprint(inventory.bp)
        
        
@bp.route('/me', methods=['GET'])
@token_required
def get_user(current_user):
    return jsonify(dict(current_user))


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
    return jsonify({'amount': current_app.config.get('MAX_FREE_PCS') - total_free_pcs})