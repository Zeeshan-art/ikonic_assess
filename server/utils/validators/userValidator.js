const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const {
  CONTROLLER_ERROR,
  AUTHORIZATION_FAILED,
} = require("../../constants/error");

const userAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ AUTHORIZATION_FAILED });
  }
  const bearer = token.split(" ")[1];
  try {
    const verify = jwt.verify(bearer, process.env.JWT_SECRET);
    req.user = verify.user;
    next();
  } catch (error) {
    return res.json({ CONTROLLER_ERROR });
  }
};
const validations = [
  body("email").isEmail(),
  body("password")
    .notEmpty()
    .withMessage("Input required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters")
    .bail()
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "g")
    .withMessage("Password must contain at least one letter and one number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = { userAuth, validations };
