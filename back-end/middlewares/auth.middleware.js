import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("No token provided", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
}; 