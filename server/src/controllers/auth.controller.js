const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/db");

// User apis

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
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

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    username,
    email,
  });
};

async function loginUser(req, res) {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    username: user.username,
    email: user.email,
  });
};

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

//Admin apis

async function registerAdmin(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: email },
  });

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    {
      id: admin.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Admin registered successfully",
    username,
    email,
  });
};

async function loginAdmin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const passMatch = await bcrypt.compare(password, admin.password);

  if (!passMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: admin.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Admin logged in successfully",
    email,
  });
};

function logoutAdmin(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Admin logged out successfully"
  })
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerAdmin,
  loginAdmin,
  logoutAdmin
};
