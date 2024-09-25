TOKEN_EXPIRATION = 3600
MAX_FREE_PCS = 10

PC_EARNINGS = [1, 2, 3, 4, 5, 6, 7]

AI_PC_SLOTS = [
    # COMMON_SLOTS, UNCOMMON_SLOTS, EPIC_SLOTS, LEGENDARY_SLOTS, MYTHIC_SLOTS, RARE_SLOTS, ULTRA_SLOTS
    [1, 5, 10, None, None, None, None],       # AI_COMMON_PC
    [1, 1, 5, 10, None, None, None],          # AI_UNCOMMON_PC
    [1, 1, 1, 5, 10, None, None],             # AI_EPIC_PC
    [1, 1, 1, 1, 5, None, None],              # AI_LEGENDARY_PC
    [1, 1, 1, 1, 1, 5, 10],                  # AI_MYTHIC_PC
    [1, 1, 1, 1, 1, 1, 5],                   # AI_RARE_PC
    [1, 1, 1, 1, 1, 1, 1]                    # AI_ULTRA_PC (повторяющиеся строки заменены на одну)
]

PC_AI_SLOTS = [
    [1, 1, 1, 1, 1, 1, 1],
    [5, 1, 1, 1, 1, 1, 1],
    [10, 5, 1, 1, 1, 1, 1],
    [None, 10, 5, 1, 1, 1, 1],
    [None, None, 10, 5, 1, 1, 1],
    [None, None, None, None, 5, 1, 1],
    [None, None, None, None, 10, 5, 1]
]

PC_LIFETIME = [3600, 7200, 10800, 14400, 18000, 21600, 25200]

AI_DURATION = [25200, 21600, 18000, 14400, 10800, 7200, 3600]

MINT_PC_PRICE = 10
MINT_PC_CONTENT = [
    {'rarity': 6, 'prob': 1},
    {'rarity': 5, 'prob': 4},
    {'rarity': 4, 'prob': 8},
    {'rarity': 3, 'prob': 12},
    {'rarity': 2, 'prob': 25},
    {'rarity': 1, 'prob': 50},
]

MINT_AI_PRICE = 1
MINT_AI_CONTENT = [
    {'rarity': 6, 'prob': 1},
    {'rarity': 5, 'prob': 4},
    {'rarity': 4, 'prob': 8},
    {'rarity': 3, 'prob': 12},
    {'rarity': 2, 'prob': 25},
    {'rarity': 1, 'prob': 50},
]