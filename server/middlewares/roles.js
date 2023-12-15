function authorizeRoles(requiredRole) {
  return (req, res, next) => {
    const user = req.user;
    console.log("enter2");
    if (user.role === requiredRole) {
      console.log("enter");
      next();
    } else {
      console.log("enter1");
      return res.status(403).json({ message: "Unauthrized Access" });
    }
  };
}
module.exports = authorizeRoles;
