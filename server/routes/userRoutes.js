const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/userController");

router.post("/add-user", UserControllers.addUser);
router.get("/get-all-users", UserControllers.getAllUsers);
router.get("/get-user-by-id/:id", UserControllers.getUserById);
router.patch("/update-user-by-id/:id", UserControllers.updateUserById);
router.delete("/delete-user-by-id/:id", UserControllers.deleteUserById);

module.exports = router;
