from flask import make_response, request
from functools import wraps


def limited_response(view, max=50, default=20):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        limit = request.args.get('limit', default=default, type=int)
        offset = request.args.get('offset', default=0, type=int)

        if limit < 1 or limit > max:
            return make_response('Invalid limit', 400)

        if offset < 0:
            return make_response('Invalid offset', 400)

        return view(*args, **kwargs, limit=limit, offset=offset)

    return wrapped_view