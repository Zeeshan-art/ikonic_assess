const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/postController");

router.post("/add-post", PostControllers.addPost);
router.get("/get-all-posts", PostControllers.getAllPosts);
router.get("/get-post-by-id/:id", PostControllers.getPostById);
router.patch("/update-post-by-id/:id", PostControllers.updatePostById);
router.delete("/delete-post-by-id/:id", PostControllers.deletePostById);

module.exports = router;
