const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/userController");
const userAuthorize = require("../utils/validators/userValidator");

router.post("/register", UserControllers.registerUser);
router.post("/login", UserControllers.loginUser);
router.get("/get-all", UserControllers.getAllUsers);
router.get("/get-by-id/:id", UserControllers.getUserById);
router.patch("/update-by-id/:id", UserControllers.updateUserById);
router.delete("/delete-by-id/:id", UserControllers.deleteUserById);

module.exports = router;
