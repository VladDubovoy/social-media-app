import Post from "../models/Post.js";
import User from "../models/User.js";
import { BaseService } from "./base.service.js";

export class PostService extends BaseService {
  constructor() {
    super(Post);
  }

  async getUserFeed(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const posts = await this.model.find().sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getUserPosts(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }
      
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const posts = await this.model.find({ userId }).sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async likePost(postId, userId) {
    try {
      const post = await this.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      // Initialize likes as a Map if it doesn't exist
      if (!post.likes) {
        post.likes = new Map();
      }

      // Convert likes to a regular object for easier manipulation
      const likesObj = Object.fromEntries(post.likes);
      const isLiked = likesObj[userId];

      if (isLiked) {
        delete likesObj[userId];
      } else {
        likesObj[userId] = true;
      }

      // Convert back to Map and save
      post.likes = new Map(Object.entries(likesObj));
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

  async deletePost(postId) {
    try {
      const post = await this.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      await this.model.findByIdAndDelete(postId);
      
      // Return all posts after deletion
      return await this.model.find().sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  async createPost(postData) {
    try {
      const { userId, description, picturePath, firstName, lastName } = postData;
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      const newPost = new Post({
        userId,
        firstName,
        lastName,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: new Map(),
        comments: [],
      });

      await newPost.save();

      // Return all posts sorted by creation date with user information
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'firstName lastName picturePath');

      return posts;
    } catch (error) {
      throw new Error(error.message);
    }
  }
} 