const roles = require("../utils/roles");
function authorizeRoles(requiredRole) {
  return (req, res, next) => {
    const user = req.user;
    if (user.role === requiredRole) {
      next();
    } else {
      return res.status(403).json({ message: "Unauthrized Access" });
    }
  };
}
module.exports = authorizeRoles;
