const { AUTHORIZATION_FAILED } = require("../constants/error");
function authorizeRoles(requiredRole) {
  return (req, res, next) => {
    const user = req.user;

    if (user.role === requiredRole) {
      next();
    } else {
      return res.json({ AUTHORIZATION_FAILED });
    }
  };
}
module.exports = authorizeRoles;
