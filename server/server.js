const express = require("express");
const connectDB = require("./config/dbConfig");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

connectDB(DATABASE_URL);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
