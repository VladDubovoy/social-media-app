import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  activeProfileId: null,
  user: null,
  token: null,
  posts: [],
  friends: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setActiveProfile: (state, action) => {
      state.activeProfileId = action.payload.userId;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.activeProfileId = null;
      state.posts = [];
      state.friends = [];
    },
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
  },
});

export const {
  setMode,
  setUser,
  setToken,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  removePost,
  setActiveProfile,
} = authSlice.actions;
export default authSlice.reducer;
