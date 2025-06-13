import User from '../models/User.js';
import Post from '../models/Post.js';
import { users, posts } from '../seed-data/ukrainian-users.js';

export const seedDatabase = async () => {
  try {
    // Check if we already have data
    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();

    if (userCount === 0) {
      await User.insertMany(users);
      console.log('Users seeded successfully');
    } else {
      console.log('Users already exist in database');
    }

    if (postCount === 0) {
      await Post.insertMany(posts);
      console.log('Posts seeded successfully');
    } else {
      console.log('Posts already exist in database');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}; 