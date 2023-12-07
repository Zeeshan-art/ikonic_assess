const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const roles = require("../utils/roles");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("password @ email", email, password);
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      if (email === process.env.ADMIN_EMAIL) {
        const data = await User.create({
          email,
          password: hashPassword,
          role: roles.Admin,
        });
        return res
          .status(201)
          .json({ data, message: "User registered successfully" });
      } else {
        const data = await User.create({
          email,
          password: hashPassword,
        });
        return res
          .status(201)
          .json({ data, message: "User registered successfully" });
      }
    }
  } catch (error) {
    console.log("serverError", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email does'nt Exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      console.log(token);
      user.password = password;
      const data = { token: token, user: user };
      return res.status(200).json({ data, message: "Login Successfully" });
    } else {
      return res.status(401).json({ error: "Invalid Password" });
    }
  } catch (error) {
    return res.status(404).json({ error: "Email does'nt Exist" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res
        .status(200)
        .json({ data, message: "User data accessed successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await User.findById(userId);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res
        .status(200)
        .json({ data, message: "User data accessed successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { email, password, role } = req.body;
  try {
    const data = await User.findByIdAndUpdate(userId, {
      $set: { email, password, role },
    });
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await User.findByIdAndDelete(userId);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
