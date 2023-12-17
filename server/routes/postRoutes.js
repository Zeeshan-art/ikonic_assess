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
router.get("/:id", userAuth, PostControllers.postLikeandUnlikes);
router.get("/get-by-user-id/:id", PostControllers.getAllPostsByUserId);
router.patch(
  "/update-by-id/:id",
  userAuth,
  authorizeRoles(ROLES.USER),
  PostControllers.updatePostById
);
router.delete("/:id", userAuth, PostControllers.deletePostById);
router.delete("/delete-all", PostControllers.deleteallPosts);

module.exports = router;
