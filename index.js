const express = require("express");
const { registerUser, loginUser } = require("./auth/authController");
const authenticatedRoutes = require("./authenticatedRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());

app.post("/register", registerUser);

app.post("/login", loginUser);

app.use("/", authenticatedRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
