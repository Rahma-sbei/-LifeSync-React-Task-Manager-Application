//This middleware retrieves user role from request object
//checks if the user has the necessary role(s) to access a route
const isAutho = (allowedRoles) => {
  return (req, res, next) => {
    // if the exists and its role is included in the allowed roles
    if (req.user && allowedRoles.includes(req.user.role)) {
      next(); //proceed to the next middleware or route handler
    } else {
      res
        .status(403)
        .json({ msg: "Access forbidden - Insufficient privileges" });
    }
  };
};
module.exports = { isAutho };
