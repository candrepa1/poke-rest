const { pool } = require("../connectPg");

const addFavoritePokemon = async (req, res) => {
  const { name: pokemon_name, id: pokemon_id } = req.body;
  const userId = req.user.id;
  const query = `
      INSERT INTO favorite_pokemons (user_id, pokemon_id, pokemon_name) 
      VALUES ($1, $2, $3) 
      ON CONFLICT (user_id, pokemon_id) DO NOTHING
    `;

  try {
    const result = await pool.query(query, [userId, pokemon_id, pokemon_name]);
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ message: "Pokémon added to favorites successfully!" });
    } else {
      res
        .status(400)
        .json({ message: "This Pokémon is already in your favorites" });
    }
  } catch (error) {
    console.error("Error adding Pokémon to favorites:", error);
    res.status(500).json({ message: "Error adding Pokémon to favorites" });
  }
};

const getFavoritePokemons = async (req, res) => {
  const userId = req.user.id;
  const query = `
      SELECT pokemon_id, pokemon_name
      FROM favorite_pokemons
      WHERE user_id = $1;
    `;

  try {
    const result = await pool.query(query, [userId]);

    if (result.rowCount === 0) {
      res.status(200).json({ profile: [] });
    }

    res.status(200).json([result.rows]);
  } catch (error) {
    console.error("Error adding Pokémon to favorites:", error);
    res.status(500).json({ message: "Error adding Pokémon to favorites" });
  }
};

const removeFavoritePokemon = async (req, res) => {
  const { id: pokemon_id } = req.params;
  const userId = req.user.id;
  const query = `
      DELETE FROM favorite_pokemons
      WHERE user_id = $1 AND pokemon_id = $2
    `;

  try {
    const result = await pool.query(query, [userId, pokemon_id]);
    if (result.rowCount > 0) {
      res
        .status(201)
        .json({ message: "Pokémon removed from favorites successfully!" });
    } else {
      res
        .status(400)
        .json({ message: "This Pokémon was not found in your favorites" });
    }
  } catch (error) {
    console.error("Error removing Pokémon from favorites:", error);
    res.status(500).json({ message: "Error removing Pokémon from favorites" });
  }
};

module.exports = {
  addFavoritePokemon,
  getFavoritePokemons,
  removeFavoritePokemon,
};
