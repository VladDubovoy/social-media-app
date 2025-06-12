import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/app.config.js";
import User from "../models/User.js";
import { BaseService } from "./base.service.js";

export class AuthService extends BaseService {
  constructor() {
    super(User);
  }

  async register(userData) {
    try {
      const { firstName, lastName, email, password, picturePath, friends, location, occupation } = userData;

      // Check if user already exists
      const existingUser = await this.model.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      // Hash password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = await this.create({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });

      // Generate token
      const token = this.generateToken(newUser._id);

      return { user: newUser, token };
    } catch (error) {
      throw error;
    }
  }

  async login(credentials) {
    try {
      const { email, password } = credentials;

      // Find user
      const user = await this.model.findOne({ email });
      if (!user) {
        throw new Error("User does not exist");
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      // Generate token
      const token = this.generateToken(user._id);

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw error;
    }
  }
} 