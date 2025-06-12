import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  friends: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload.friends;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.post._id
      );
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload.post);
    },
  },
});

export const {
  setFriends,
  setPosts,
  setPost,
  removePost,
  addPost,
} = postsSlice.actions;

export default postsSlice.reducer; 