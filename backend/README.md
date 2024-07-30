Install and launch
===

**Create and activate .venv:**

For Windows:

    py -3 -m venv .venv
    .venv\Scripts\activate

For macOS/Linux:

    python3 -m venv .venv
    . .venv/bin/activate

**Installation:**

    pip install -e .

**Initialize db**

    flask --app init-db

**Configuration:**

Create ***config.py*** in instance folder. Required props: **BOT_TOKEN**.

**Run:**

    flask --app app run

Endpoints
===