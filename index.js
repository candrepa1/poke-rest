const express = require("express");
const { registerUser } = require("./auth/authController");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  await registerUser(req, res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
