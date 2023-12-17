const Post = require("../models/postModel");
const User = require("../models/userModel");
const {
  ROLES,
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const {
  CONTROLLER_ERROR,
  AUTHORIZATION_FAILED,
} = require("../constants/error");

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
  console.log(_id);
  const { caption } = req.body;
  try {
    const post = await Post.create({
      caption,
      postOwner: _id,
    });

    const user = await User.findById({ _id });
    console.log("post_id", user);
    user.posts.push(post._id);
    await user.save();

    return res.json({
      post,
      status: API_STATUS_CODES.SUCCESS,
      message: RESPONSE_MESSAGES.SUCCESS,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({ CONTROLLER_ERROR });
  }
};

const postLikeandUnlikes = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    }
    if (post.likes.includes(userId)) {
      const index = post.likes.indexOf(userId);
      post.likes.splice(index, 1);
      await post.save();
      res.json({
        sucess: 200,
        message: "post unlike",
      });
    } else {
      post.likes.push(userId);
      await post.save();
      res.json({
        sucess: 200,
        message: "post like",
      });
    }
  } catch (error) {
    console.log(error);
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
  const userId = req.user._id;
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.json({
        status: API_STATUS_CODES.NOT_FOUND,
        message: RESPONSE_MESSAGES.NOT_FOUND,
      });
    }
    if (post.postOwner.toString() !== userId.toString()) {
      return res.json({
        AUTHORIZATION_FAILED,
      });
    }

    await post.deleteOne({postId});
    console.log(postId);
    const user = await User.findById(userId);

    const index = user.posts.indexOf(postId);
    user.posts.splice(index, 1);
    await user.save();

    return res.json({
      status: API_STATUS_CODES.SUCCESS,
      message: RESPONSE_MESSAGES.SUCCESS,
    });
  } catch (error) {
    console.log("error", error);
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
  postLikeandUnlikes,
};
