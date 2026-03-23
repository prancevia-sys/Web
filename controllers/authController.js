const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  //   const { fullName, email, password } = req.body;

  //   // Validation: Check for missing fields
  //   if (!fullName || !email || !password) {
  //     return res.status(400).json({ message: "All fields are required!" });
  //   }

  try {
    // // Check if user already exists
    // const existingUser = await User.findOne({ email });

    // if (existingUser) {
    //   return res.status(400).json({ message: "User already exist!" });
    // }

    // Create the User
    const user = await User.create({
      fullName: process.env.ADMIN_LOGIN_NAME,
      email: process.env.ADMIN_LOGIN_EMAIL,
      password: process.env.ADMIN_LOGIN_PASS,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error login user", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
