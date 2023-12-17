const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/userController");
const UserValidators = require("../utils/validators/userValidator");
const { userAuth } = require("../utils/validators/userValidator");
const { ROLES } = require("../constants/constants");
const authorizeRoles = require("../middlewares/roles");

router.post(
  "/register",
  UserValidators.validations,
  UserControllers.registerUser
);
router.post("/login", UserValidators.validations, UserControllers.loginUser);
router.get("/follow/:id", userAuth, UserControllers.userFollowerandfollwoing);
router.get("/get-all", UserControllers.getAllUsers);
router.get("/get-by-id/:id", UserControllers.getUserById);
router.patch(
  "/update-by-id/:id",
  UserValidators.validations,
  UserControllers.updateUserById
);
router.delete(
  "/delete-by-id/:id",userAuth,
  authorizeRoles(ROLES.ADMIN),
  UserControllers.deleteUserById
);
//router.delete("/delete-all", UserControllers.deleteallUser);

module.exports = router;
