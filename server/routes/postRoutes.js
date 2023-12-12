const express = require("express");
const router = express.Router();
const PostControllers = require("../controllers/postController");
const authorizeRoles = require("../middlewares/roles");
const { userAuth } = require("../utils/validators/userValidator");
const { ROLES } = require("../constants/constants");

router.post(
  "/add",
  userAuth,
  authorizeRoles(ROLES.USER),
  PostControllers.addPost
);
router.get("/get-all", userAuth, PostControllers.getAllPosts);
router.get("/get-by-id/:id", PostControllers.getPostById);
router.patch(
  "/update-by-id/:id",
  userAuth,
  authorizeRoles(ROLES.USER),
  PostControllers.updatePostById
);
router.delete("/delete-by-id/:id", PostControllers.deletePostById);

module.exports = router;
