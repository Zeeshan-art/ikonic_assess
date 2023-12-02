const User = require("../models/userModel");

const addUser = async (req, res) => {
  const { username, email, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    } else {
      const data = await User.create({ username, email, role }).save();
      return res
        .status(201)
        .json({ data, message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addUser };
