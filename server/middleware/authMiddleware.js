const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid token format" });
  }

  const jwtToken = token.replace("Bearer ", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log("Token Verified:", isVerified);

    const userData = await User.findById(isVerified.id).select("-password");
    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userData;
    req.token = jwtToken;
    req.id = userData._id;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
