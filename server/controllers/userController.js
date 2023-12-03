const User = require("../models/userModel");

const addUser = async (req, res) => {
  const { username, email, role } = req.body;
  try {
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    } else {
      const data = await User.create({
        username,
        email,
        role,
      });
      return res
        .status(201)
        .json({ data, message: "User registered successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
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
  const { username, email, role } = req.body;
  try {
    const data = await User.findByIdAndUpdate(userId, {
      $set: { username, email, role },
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
  addUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
