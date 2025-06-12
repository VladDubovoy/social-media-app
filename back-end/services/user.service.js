import User from "../models/User.js";
import { BaseService } from "./base.service.js";

export class UserService extends BaseService {
  constructor() {
    super(User);
  }

  async getUserFriends(userId) {
    try {
      const user = await this.findById(userId);
      const friends = await this.model.find({ _id: { $in: user.friends } });
      return friends;
    } catch (error) {
      throw error;
    }
  }

  async addRemoveFriend(userId, friendId) {
    try {
      const user = await this.findById(userId);
      const friend = await this.findById(friendId);

      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter(id => id !== friendId);
        friend.friends = friend.friends.filter(id => id !== userId);
      } else {
        user.friends.push(friendId);
        friend.friends.push(userId);
      }

      await user.save();
      await friend.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userId, updateData) {
    try {
      const user = await this.findById(userId);
      
      // Update user profile
      Object.keys(updateData).forEach(key => {
        if (key !== "password" && key !== "email") {
          user[key] = updateData[key];
        }
      });

      // If password is being updated, hash it
      if (updateData.password) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(updateData.password, salt);
      }

      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async searchUsers(query) {
    try {
      const searchQuery = {
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } }
        ]
      };
      return await this.findAll(searchQuery);
    } catch (error) {
      throw error;
    }
  }
} 