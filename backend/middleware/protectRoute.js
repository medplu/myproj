import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: "You need to be logged in to visit this route" });
    }

    // Split to get token from 'Bearer <token>' format
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "You need to be logged in to visit this route" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the token is valid
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Fetch user using userId from token
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ message: error.message });
  }
};
