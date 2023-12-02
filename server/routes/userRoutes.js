const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/userController");

router.post("/add-user", UserControllers.addUser);

module.exports = router;
