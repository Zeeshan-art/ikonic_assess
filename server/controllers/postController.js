const Post = require("../models/postModel");

const addPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const data = await Post.create({
      title,
      content,
    });
    return res.status(201).json({ data, message: "Post Created Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const data = await Post.find();
    if (!data) {
      return res.status(404).json({ error: "Post not found" });
    } else {
      return res
        .status(200)
        .json({ data, message: "Post data accessed successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const data = await Post.findById(postId);
    if (!data) {
      return res.status(404).json({ error: "Post not found" });
    } else {
      return res
        .status(200)
        .json({ data, message: "Post data accessed successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ message: "Post Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const data = await Post.findByIdAndDelete(postId);
    if (!data) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
