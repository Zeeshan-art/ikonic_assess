const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const userAuth = (req, res, next) => {
  const token = req.headers.authorize;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  const bearer = token.split(" ")[1];
  try {
    const verify = jwt.verify(bearer, process.env.JWT_SECRET);
    req.user = verify.user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};
module.exports = userAuth;
