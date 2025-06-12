import Post from "../models/Post.js";
import { BaseService } from "./base.service.js";

export class PostService extends BaseService {
  constructor() {
    super(Post);
  }

  async getUserFeed(userId) {
    try {
      const user = await this.model.findById(userId);
      const posts = await this.model.find({
        $or: [
          { userId },
          { userId: { $in: user.friends } }
        ]
      }).sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getUserPosts(userId) {
    try {
      return await this.findAll({ userId }).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  async likePost(postId, userId) {
    try {
      const post = await this.findById(postId);
      
      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter(id => id !== userId);
      } else {
        post.likes.push(userId);
      }

      await post.save();
      return post;
    } catch (error) {
      throw error;
    }
  }

  async addComment(postId, userId, comment) {
    try {
      const post = await this.findById(postId);
      post.comments.push({
        userId,
        text: comment,
        createdAt: new Date()
      });
      
      await post.save();
      return post;
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(postId, commentId) {
    try {
      const post = await this.findById(postId);
      post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
      
      await post.save();
      return post;
    } catch (error) {
      throw error;
    }
  }

  async searchPosts(query) {
    try {
      const searchQuery = {
        $or: [
          { description: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } }
        ]
      };
      return await this.findAll(searchQuery).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }
} 