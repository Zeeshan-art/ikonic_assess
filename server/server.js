const express = require("express");
const connectDB = require("./config/db-config");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
