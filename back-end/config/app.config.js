import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  port: process.env.PORT || 6001,
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/social_media_app",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  uploadPath: path.join(__dirname, "../public/assets"),
  bodyParserLimit: "30mb",
  corsOptions: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
  errorMessages: {
    notFound: "Resource not found",
    validation: "Validation error",
    duplicateKey: "Duplicate key error",
    jwtInvalid: "Invalid token",
    jwtExpired: "Token expired",
    serverError: "Internal server error",
  },
}; 