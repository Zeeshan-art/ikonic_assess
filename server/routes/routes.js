const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

function routes() {
  router.use("/user", userRoutes);
  router.use("/post", postRoutes);
  return router;
}

module.exports = routes();
