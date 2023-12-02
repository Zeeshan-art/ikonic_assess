const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");

function routes() {
  router.use("/user", userRoutes);
  return router;
}

module.exports = routes();
