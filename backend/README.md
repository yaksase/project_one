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

    flask --app app init-db

**Configuration:**

Create ***config.py*** in instance folder. Required props: 

* **BOT_TOKEN** - required to validate authorization data from the Telegram mini app
* **FRONTEND_URL** - required to whitelist frontend app origin
* **TOKEN_EXPIRATION** - required to check for init data expiration

**Run:**

    flask --app app run

Endpoints
===

For every request you must provide **Authorization** header which has an authorization method and a token. For now only **tma** method is supported and **init_data** from telegram stands as a token.

/api
===
* GET **/me** - get info about current user. Returns json: *{id: int, name: string, tokens: int, tons: int}*
* GET **/leaderboard** - get top 100 users by token count. Sorted by token count (DESC) and by username (ASC). Returns array of users *{id: int, name: string, tokens: int, tons: int}*
* GET **/free_pc** - get amount of free PCs that are ready to be claimed by users.

    /inventory
    ===
    * GET **/pc** - get PCs for current user (sorted by rarity DESC and by id ASC). Parameters: **limit** *(default: 20, min: 1, max: 50)*, **offset** *(default: 0)*