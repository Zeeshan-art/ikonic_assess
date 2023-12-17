const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  ROLES,
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const {
  CONTROLLER_ERROR,
  INVALID_REQUEST,
  AUTHORIZATION_FAILED,
} = require("../constants/error");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: API_STATUS_CODES.DUPLICATE_ENTRY,
        message: RESPONSE_MESSAGES.DUPLICATE_ENTRY,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      if (email === process.env.ADMIN_EMAIL) {
        const data = await User.create({
          email,
          password: hashPassword,
          role: ROLES.ADMIN,
        });
        return res.json({
          data,
          status: API_STATUS_CODES.SUCCESS,
          message: RESPONSE_MESSAGES.SUCCESS,
        });
      } else {
        const data = await User.create({
          email,
          password: hashPassword,
        });
        return res.json({
          data,
          status: API_STATUS_CODES.SUCCESS,
          message: RESPONSE_MESSAGES.SUCCESS,
        });
      }
    }
  } catch (error) {
    return res.json(CONTROLLER_ERROR);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      user.password = password;
      const data = { token: token, user: user };
      return res.json({
        data,
        status: API_STATUS_CODES.SUCCESS,
        message: RESPONSE_MESSAGES.SUCCESS,
      });
    } else {
      return res.json({ AUTHORIZATION_FAILED });
    }
  } catch (error) {
    return res.json(CONTROLLER_ERROR);
  }
};
const userFollowerandfollwoing = async (req, res) => {
  const userId = req.user._id;
  const followingId = req.params.id;
  try {
    const usertoFollow = await User.findById(followingId);
    const loggedUser = await User.findById(userId);
    if (!usertoFollow) {
      return res.json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    }

    if (loggedUser.following.includes(usertoFollow._id)) {
      const followerIndex = usertoFollow.followers.indexOf(userId);
      const followingIndex = loggedUser.following.indexOf(usertoFollow._id);
      loggedUser.following.splice(followingIndex, 1);
      usertoFollow.followers.splice(followerIndex, 1);
      await loggedUser.save();
      await usertoFollow.save();

      await usertoFollow.save();
      return res.json({
        status: 200,
        message: "Unfollow",
      });
    } else {
      loggedUser.following.push(usertoFollow._id);
      usertoFollow.followers.push(userId);
      await loggedUser.save();
      await usertoFollow.save();
      return res.json({
        status: 200,
        message: "Follow",
      });
    }
  } catch (error) {}
};
const getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});
    if (data.length === 0) {
      return res.json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    } else {
      return res.json({
        data,
        status: API_STATUS_CODES.SUCCESS,
        message: RESPONSE_MESSAGES.SUCCESS,
      });
    }
  } catch (error) {
    return res.json(CONTROLLER_ERROR);
  }
};
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await User.findById(userId);
    if (!data) {
      return res.json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    } else {
      return res.json({
        data,
        status: API_STATUS_CODES.SUCCESS,
        message: RESPONSE_MESSAGES.SUCCESS,
      });
    }
  } catch (error) {
    return res.json(CONTROLLER_ERROR);
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
      return res.json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    }
    return res.json({
      data,
      status: API_STATUS_CODES.SUCCESS,
      message: RESPONSE_MESSAGES.SUCCESS,
    });
  } catch (error) {
    return res.json(CONTROLLER_ERROR);
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await User.findByIdAndDelete(userId);
    if (!data) {
      return res.json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    }
    return res.json({
      status: API_STATUS_CODES.SUCCESS,
      message: RESPONSE_MESSAGES.SUCCESS,
    });
  } catch (error) {
    return res.json(CONTROLLER_ERROR);
  }
};
const deleteallUser = async (req, res) => {
  try {
    const data = await User.deleteMany({});
    if (data.deletedCount === 0) {
      return res.json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    }
    return res.json({
      status: API_STATUS_CODES.SUCCESS,
      message: RESPONSE_MESSAGES.SUCCESS,
    });
  } catch (error) {
    return res.json(CONTROLLER_ERROR);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userFollowerandfollwoing,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteallUser,
};
