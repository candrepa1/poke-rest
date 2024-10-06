const express = require("express");
const {
  registerUser,
  loginUser,
  authenticateToken,
} = require("./auth/authController");
const { searchPokemon } = require("./pokemons/searchController");
const {
  addFavoritePokemon,
  removeFavoritePokemon,
} = require("./pokemons/favoritesController");
const { createProfile, getProfile } = require("./profile/profileController");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  await registerUser(req, res);
});

app.post("/login", async (req, res) => {
  await loginUser(req, res);
});

app.get("/pokemon", authenticateToken, async (req, res) => {
  await searchPokemon(req, res);
});

app.post("/favorites", authenticateToken, async (req, res) => {
  await addFavoritePokemon(req, res);
});

app.delete("/favorites/:id", authenticateToken, async (req, res) => {
  await removeFavoritePokemon(req, res);
});

app.put("/profile/:id", authenticateToken, async (req, res) => {
  await createProfile(req, res);
});

app.get("/profile/:id", authenticateToken, async (req, res) => {
  await getProfile(req, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
