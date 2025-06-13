import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import { config } from "./config/app.config.js";
import { seedDatabase } from "./utils/seedDatabase.js";
import Post from './models/Post.js';
import User from './models/User.js';
import { users, posts } from './seed-data/ukrainian-users.js';
import { 
  errorHandler, 
  notFoundHandler,
  validationErrorHandler,
  duplicateKeyErrorHandler,
  jwtErrorHandler,
  jwtExpiredErrorHandler
} from "./middlewares/error.middleware.js";
import authRoutes from "./api/auth.route.js";
import userRoutes from "./api/users.route.js";
import postRoutes from "./api/posts.route.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "public/assets");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:6001"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Handle 404 errors
app.use(notFoundHandler);

// Global error handling
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") err = validationErrorHandler(err);
  if (err.code === 11000) err = duplicateKeyErrorHandler(err);
  if (err.name === "JsonWebTokenError") err = jwtErrorHandler();
  if (err.name === "TokenExpiredError") err = jwtExpiredErrorHandler();
  next(err);
});

// Error handler middleware
app.use(errorHandler);

/* MONGOOSE SETUP */
mongoose
  .connect(config.mongoUrl)
  .then(async () => {
    console.log("Connected to MongoDB");
    // Start server
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    // Seed database
    // await seedDatabase();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
