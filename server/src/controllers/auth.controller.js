const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/db");

// User apis

async function registerUser(req, res) {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userResponse = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role,
    },
  });

  const token = jwt.sign(
    {
      id: userResponse.id,
      role: userResponse.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });

  const user = {
    username: userResponse.username,
    email: userResponse.email,
    role: userResponse.role
  }

  res.status(201).json({
    message: "User registered successfully",
    user: user
  });
}

async function loginUser(req, res) {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userResponse = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userResponse) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const passMatch = await bcrypt.compare(password, userResponse.password);

  if (!passMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: userResponse.id,
      role: userResponse.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  });

  const user = {
    username: userResponse.username,
    email: userResponse.email,
    role: userResponse.role,
  };

  res.status(200).json({
    message: "User logged in successfully",
    user: user
  });
}

async function getCurrentUser(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      username: true,
      email: true,
      role: true,
    },
  });
  res.status(200).json({ user: user });
}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
