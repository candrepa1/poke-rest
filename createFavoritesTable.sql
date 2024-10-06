CREATE TABLE favorite_pokemons (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    pokemon_id INTEGER NOT NULL,
    pokemon_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, pokemon_id)
);
