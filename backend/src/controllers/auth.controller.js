import { User } from "../models/user.model.js";
import { generateToken } from "../lib/utils/generateToken.js";

// Register Controller
export const register = async (req, res) => {
  console.log("Register Request Body:", req.body);

  try {
    const { fullName, email, number, address, role, password } = req.body;

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const user = await User.create({
      fullName,
      email,
      number,
      address,
      role,
      password,
    });

    res.status(201).json({
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  // In JWT-based auth, logout is handled on the client side.
  // You can clear token on client or respond with a dummy message.
  res
    .status(200)
    .json({ message: "User logged out successfully (handled on client)." });
};
