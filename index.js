const express = require("express");
const { registerUser, loginUser } = require("./auth/authController");
const { searchPokemon } = require("./pokemons/searchController");
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

app.get("/pokemon", async (req, res) => {
  await searchPokemon(req, res);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
