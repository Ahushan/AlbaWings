import User from "../models/User.js";
import { generateAccessToken } from "../utils/token.js";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('registration');
    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

/* LOGIN (COOKIE BASED) */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateAccessToken({
      userId: user._id,
      role: user.role
    });

    // ✅ SET COOKIE
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* LOGOUT (COOKIE BASED) */
export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.json({
    success: true,
    message: "Logged out successfully"
  });
};
