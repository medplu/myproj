import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return next(createError(401, "You are not authenticated!"));
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));

    // Fetch the user from the database to check email verification status
    const foundUser = await User.findById(user.userId);
    if (!foundUser || !foundUser.isVerified) {
      return next(createError(403, "Email not verified!"));
    }

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  if (req.user && (req.user.id || req.user.isAdmin || req.user.isDoctor)) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};
