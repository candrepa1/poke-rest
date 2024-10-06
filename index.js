// app.js
const express = require("express");
const { registerUser } = require("./auth/authController");
const app = express();
require("dotenv").config(); // Load .env variables

// Middleware to parse JSON requests
app.use(express.json());

// Basic route to test the API
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  registerUser(req, res);
});

// Define the port the server will run on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
