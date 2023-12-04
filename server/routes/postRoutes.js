const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/postController");
const roles = require("../utils/roles");
const authorizeRoles = require("../middlewares/roles");
const userAuthorize = require("../utils/validators/userValidator");

router.post(
  "/add-post",
  userAuthorize,
  authorizeRoles(roles.User),
  PostControllers.addPost
);
router.get(
  "/get-all-posts",
  userAuthorize,
  authorizeRoles(roles.Admin),
  PostControllers.getAllPosts
);
router.get("/get-post-by-id/:id", PostControllers.getPostById);
router.patch(
  "/update-post-by-id/:id",
  userAuthorize,
  authorizeRoles(roles.User),
  PostControllers.updatePostById
);
router.delete("/delete-post-by-id/:id", PostControllers.deletePostById);

module.exports = router;
