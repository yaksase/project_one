from flask import Blueprint, request, make_response, jsonify
import json
import random
from functools import reduce

from app.db import insert_ai, insert_pc, update_tons
from app.token_required import token_required
from app.parameters import (MINT_PC_PRICE, MINT_AI_PRICE, MINT_PC_CONTENT, 
                            PC_AI_SLOTS, PC_LIFETIME, PC_EARNINGS,
                            MINT_AI_CONTENT, AI_PC_SLOTS, AI_DURATION)

bp = Blueprint('mint', __name__, url_prefix='/mint')


def open_case(array):
    """
    array must be a list of {'rarity': integer, 'prob': integer}
    returns rarity of a randomly picked item
    if somehow no item was picked raises a ValueError
    """
    rand_num = random.randint(0, sum(item['prob'] for item in array))
    cum_prob = 0
    for item in array:
        cum_prob += item['prob']
        if rand_num < cum_prob:
            return item['rarity']
    raise ValueError()

@bp.route('/pc', methods=['GET', 'PUT'])
@token_required
def mint_pc(current_user):
    if request.method == 'GET':
        return make_response(jsonify({'price': MINT_PC_PRICE}), 200)
    if request.method == 'PUT':
        if current_user['tons'] < MINT_PC_PRICE:
            return make_response(jsonify({'message': 'Not enough ton'}), 400)
        pc_rarity = open_case(MINT_PC_CONTENT)
        insert_pc(current_user['id'], pc_rarity)
        update_tons(current_user['id'], -MINT_PC_PRICE)
        return make_response(jsonify({'rarity': pc_rarity, 
                                      'slots': PC_AI_SLOTS[pc_rarity],
                                      'lifetime': PC_LIFETIME[pc_rarity],
                                      'earnings': PC_EARNINGS[pc_rarity]}), 200)


@bp.route('/ai', methods=['GET', 'PUT'])
@token_required
def mint_ai(current_user):
    if request.method == 'GET':
        return make_response(jsonify({'price': MINT_AI_PRICE}), 200)
    if request.method == 'PUT':
        if current_user['tons'] < MINT_AI_PRICE:
            print('hey')
            return make_response(jsonify({'message': 'Not enough ton'}), 400)
        ai_rarity = open_case(MINT_AI_CONTENT)
        insert_ai(current_user['id'], ai_rarity)
        update_tons(current_user['id'], -MINT_AI_PRICE)
        return make_response(jsonify({'rarity': ai_rarity, 
                                      'slots': AI_PC_SLOTS[ai_rarity],
                                      'duration': AI_DURATION[ai_rarity]}), 200)