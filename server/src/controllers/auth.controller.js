const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcrypt.hash(password, 10);

  const token = jwt.sign(
    {
      username,
    },
    process.env.JWT_SECRET_KEY,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    username,
    email
  })
};

module.exports = {
  registerUser,
};
