import sqlite3

import click
from flask import current_app, g


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')
    

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


def update_tons(user_id, amount):
    get_db().execute('UPDATE user SET tons = tons + ? WHERE id = ?', (amount, user_id))
    get_db().commit()


def update_tokens(user_id, amount):
    get_db().execute('UPDATE user SET tokens = tokens + ? WHERE id = ?', (amount, user_id))
    get_db().commit()


def insert_pc(user_id, rarity, is_free=False):
    get_db().execute('INSERT INTO pc (user_id, rarity, is_free) VALUES(?, ?, ?)', (user_id, rarity, is_free))
    get_db().commit()


def insert_ai(user_id, rarity):
    get_db().execute('INSERT INTO ai (user_id, rarity) VALUES(?, ?)', (user_id, rarity))
    get_db().commit()