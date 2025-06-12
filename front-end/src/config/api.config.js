const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const ASSETS_URL = process.env.REACT_APP_ASSETS_URL || 'http://localhost:3001/assets';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
  },
  USERS: {
    BASE: `${API_URL}/users`,
    FRIENDS: (userId) => `${API_URL}/users/${userId}/friends`,
    PROFILE: (userId) => `${API_URL}/users/${userId}`,
    FRIEND: (userId, friendId) => `${API_URL}/users/${userId}/${friendId}`,
  },
  POSTS: {
    BASE: `${API_URL}/posts`,
    CREATE: `${API_URL}/posts`,
    USER_POSTS: (userId) => `${API_URL}/posts/${userId}/posts`,
    LIKE: (postId) => `${API_URL}/posts/${postId}/like`,
    SINGLE: (postId) => `${API_URL}/posts/${postId}`,
    DELETE: (postId) => `${API_URL}/posts/${postId}`,
  },
  ASSETS: {
    IMAGE: (imageName) => `${ASSETS_URL}/${imageName}`,
  },
}; 