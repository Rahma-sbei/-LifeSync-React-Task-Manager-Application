const jwt = require("jsonwebtoken");
require("dotenv").config();

// check if the user is authenticated
const isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; //get token from authorization header
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token using JWT_SECRET
    req.user = decoded; // Add decoded token (user info) to request object
    next(); // Call the next middleware
  } catch (error) {
    // Handle errors if the token is invalid or expired
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ msg: "Token expired" });
    } else {
      res.status(500).json({ msg: "Server error" });
    }
  }
};
module.exports = { isAuth };
