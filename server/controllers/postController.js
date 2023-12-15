const Post = require("../models/postModel");
const User = require("../models/userModel");
const {
  ROLES,
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const { CONTROLLER_ERROR } = require("../constants/error");
const { findById } = require("../models/userModel");

// const addPost = async (req, res) => {
//   const { _id } = req.user;
//   const { title, content } = req.body;
//   try {
//     const data = await Post.create({
//       title,
//       content,
//       userId: _id,
//     });
//     return res.json({
//       data,
//       status: API_STATUS_CODES.SUCCESS,
//       message: RESPONSE_MESSAGES.SUCCESS,
//     });
//   } catch (error) {
//     return res.json({ CONTROLLER_ERROR });
//   }
// };
const addPost = async (req, res) => {
  const { _id } = req.user;
  const { title, content } = req.body;
  try {
    const data = await Post.create({
      title,
      content,
      user_id: _id,
    });
    const user = await User.findById({ _id });
    console.log("id", data._id);
    user.posts.push(data._id);
    await user.save();

    return res.json({
      data,
      status: API_STATUS_CODES.SUCCESS,
      message: RESPONSE_MESSAGES.SUCCESS,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({ CONTROLLER_ERROR });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const data = await Post.find({});
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
    return res.json({ CONTROLLER_ERROR });
  }
};
const getAllPostsByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await Post.find({ userId });
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
    return res.json({ CONTROLLER_ERROR });
  }
};
const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const data = await Post.findById(postId);
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
    return res.json({ CONTROLLER_ERROR });
  }
};
const updatePostById = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const data = await Post.findByIdAndUpdate(postId, {
      $set: { title, content },
    });
    if (!data) {
      return res.status(404).json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    }
    return res.json({
      status: API_STATUS_CODES.SUCCESS,
      message: RESPONSE_MESSAGES.SUCCESS,
    });
  } catch (error) {
    return res.json({ CONTROLLER_ERROR });
  }
};

const deletePostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const data = await Post.findByIdAndDelete(postId);
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
    return res.json({ CONTROLLER_ERROR });
  }
};
const deleteallPosts = async (req, res) => {
  try {
    const data = await Post.deleteMany({});
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
  getAllPostsByUserId,
  addPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  deleteallPosts,
};
