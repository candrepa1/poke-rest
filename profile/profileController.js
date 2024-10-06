const { pool } = require("../connectPg");

const createProfile = async (req, res) => {
  const { id } = req.params;
  const { avatar_url, bio } = req.body;

  const query = `
      UPDATE users 
      SET avatar_url = $1, bio = $2 
      WHERE id = $3
      RETURNING *;  -- This returns the updated user record
    `;

  try {
    const result = await pool.query(query, [avatar_url, bio, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

const getProfile = async (req, res) => {
  const { id } = req.params;

  const query = `
      SELECT id, username, avatar_url, bio, created_at 
      FROM users 
      WHERE id = $1;
    `;

  try {
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ profile: result.rows[0] });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ message: "Error retrieving user profile" });
  }
};

module.exports = {
  createProfile,
  getProfile,
};
