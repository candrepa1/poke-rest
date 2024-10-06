const express = require("express");
const { authenticateToken } = require("./auth/authController");
const { searchPokemon } = require("./pokemons/searchController");
const {
  addFavoritePokemon,
  removeFavoritePokemon,
} = require("./pokemons/favoritesController");
const { createProfile, getProfile } = require("./profile/profileController");
const router = express.Router();

router.use(authenticateToken);

router.get("/pokemon", searchPokemon);
router.post("/favorites", addFavoritePokemon);
router.delete("/favorites/:id", removeFavoritePokemon);
router.put("/profile/:id", createProfile);
router.get("/profile/:id", getProfile);

module.exports = router;
