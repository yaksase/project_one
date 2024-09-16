from flask import Blueprint, request, make_response, jsonify
import json

from app.db import get_db
from app.token_required import token_required
from app.limited_response import limited_response
from app.parameters import MAX_FREE_PCS

bp = Blueprint('inventory', __name__, url_prefix='/inventory')


@bp.route('/pc', methods=['GET'])
@token_required
@limited_response
def get_pc(current_user, limit, offset):
    received_data = get_db().execute('SELECT * FROM pc\
                                      WHERE user_id = ?\
                                      ORDER BY rarity DESC, id ASC\
                                      LIMIT ? OFFSET ?', (current_user['id'], limit, offset)).fetchall()
    return jsonify([dict(pc) for pc in received_data])


@bp.route('/ai', methods=['GET'])
@token_required
@limited_response
def get_ai(current_user, limit, offset):
    received_data = get_db().execute("WITH ai_and_pcs AS (\
                                      SELECT\
                                          a.id AS id,\
                                          a.user_id AS user_id,\
                                          a.rarity AS rarity,\
                                          p.id AS pc_id,\
                                          p.rarity AS pc_rarity,\
                                          p.is_activated,\
                                          p.health,\
                                          p.is_free\
                                      FROM ai AS a\
                                      LEFT JOIN pc AS p\
                                          ON a.id = p.ai_id\
                                      WHERE a.user_id = ?\
                                      )\
                                      SELECT\
                                      id,\
                                      user_id,\
                                      rarity,\
                                      CASE\
                                        WHEN pc_id IS NOT NULL THEN\
                                        json_group_array(\
                                            json_object(\
                                                'id', pc_id,\
                                                'rarity', pc_rarity,\
                                                'is_activated', is_activated,\
                                                'health', health,\
                                                'is_free', is_free\
                                            )\
                                        )\
                                        ELSE json_array()\
                                      END AS pcs\
                                      FROM ai_and_pcs\
                                      GROUP BY id, user_id, rarity\
                                      ORDER BY rarity DESC, id ASC\
                                      LIMIT ? OFFSET ?", (current_user['id'], limit, offset)).fetchall()
    
    response_data = []
    for ai in received_data:
        ai_cpy = dict(ai)
        ai_cpy['pcs'] = json.loads(ai['pcs'])
        response_data.append(ai_cpy)

    return jsonify(response_data)


@bp.route('/free_pc', methods=['PUT'])
@token_required
def claim_free_pc(current_user):
    total_free_pcs = get_db().execute('SELECT COUNT(*) FROM pc WHERE is_free = TRUE').fetchone()[0]
    if MAX_FREE_PCS - total_free_pcs <= 0:
        return make_response(jsonify({'message': 'No free PCs left'}), 409)
    free_pc = get_db().execute('SELECT * FROM pc\
                                WHERE user_id = ? AND is_free = TRUE', (current_user['id'],)).fetchone()
    if free_pc is not None:
        return make_response(jsonify({'message': 'User already claimed a free pc'}), 409)
    get_db().execute('INSERT INTO pc (user_id, rarity, is_free) VALUES(?, ?, TRUE)', (current_user['id'], 0))
    get_db().commit()
    return make_response(jsonify({'message': 'Succesfully claimed free pc'}), 200)


@bp.route('/free_ai', methods=['PUT'])
@token_required
def claim_free_ai(current_user):
    free_ai = get_db().execute('SELECT * FROM ai\
                                WHERE user_id = ?', (current_user['id'],)).fetchone()
    if free_ai is not None:
        return make_response(jsonify({'message': 'User already claimed a free ai'}), 409)
    get_db().execute('INSERT INTO ai (user_id, rarity) VALUES(?, ?)', (current_user['id'], 0))
    get_db().commit()
    return make_response(jsonify({'message': 'Succesfully claimed free ai'}), 200)