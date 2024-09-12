from flask import Blueprint, request, make_response, jsonify, current_app
import json

from app.db import get_db
from app.token_required import token_required

bp = Blueprint('inventory', __name__, url_prefix='/inventory')


@bp.route('/pc', methods=['GET'])
@token_required
def get_pc(current_user):
    limit = request.args.get('limit', default=20, type=int)
    offset = request.args.get('offset', default=0, type=int)

    if limit < 1 or limit > 50:
        return make_response('Invalid limit', 400)

    if offset < 0:
        return make_response('Invalid offset', 400)

    received_data = get_db().execute('SELECT * FROM pc\
                                      WHERE user_id = ?\
                                      ORDER BY rarity DESC, id ASC\
                                      LIMIT ? OFFSET ?', (current_user['id'], limit, offset)).fetchall()
    return jsonify([dict(pc) for pc in received_data])


@bp.route('/free_pc', methods=['PUT'])
@token_required
def claim_free_pc(current_user):
    total_free_pcs = get_db().execute('SELECT COUNT(*) FROM pc WHERE is_free = TRUE').fetchone()[0]
    if current_app.config.get('MAX_FREE_PCS') - total_free_pcs <= 0:
        return make_response(jsonify({'message': 'No free PCs left'}), 409)
    free_pc = get_db().execute('SELECT * FROM pc\
                                WHERE user_id = ? AND is_free = TRUE', (current_user['id'],)).fetchone()
    if free_pc is not None:
        return make_response(jsonify({'message': 'User already claimed a free pc'}), 409)
    get_db().execute('INSERT INTO pc (user_id, rarity, is_free) VALUES(?, ?, TRUE)', (current_user['id'], 0))
    get_db().commit()
    return make_response(jsonify({'message': 'Succesfully claimed free pc'}), 200)