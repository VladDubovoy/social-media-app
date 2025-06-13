import { useState } from 'react';
import { Box, Button, Divider, IconButton, Typography, useTheme, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { API_ENDPOINTS } from '../config/api.config';
import { setPost, setPosts, setFriends } from '../state';
import { DeleteOutlined } from '@mui/icons-material';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes = {},
  comments = [],
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.user?.friends) || [];
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;
  const isLiked = Boolean(likes[_id]);
  const likeCount = Object.keys(likes).length;
  const isFriend = Array.isArray(friends) && friends.includes(postUserId);
  const isOwnPost = _id === postUserId;

  const patchLike = async () => {
    if (!_id) {
      toast.error('Please log in to like posts', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
      });
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.POSTS.LIKE(postId), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      toast.error(error.message || 'Failed to like post', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
        icon: '❌',
      });
    }
  };

  const patchFriend = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.USERS.FRIEND(_id, postUserId), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update friend status');
      }

      const updatedUser = await response.json();
      
      // Update Redux state with the new friends array from the updated user
      dispatch(setFriends({ friends: updatedUser.friends }));
      
      toast.success(
        isFriend ? 'Removed from friends' : 'Added to friends',
        {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            padding: '16px',
          },
          icon: isFriend ? '👋' : '👋',
        }
      );
    } catch (error) {
      toast.error(error.message || 'Failed to update friend status', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
        icon: '❌',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePost = async () => {
    if (!postId) {
      toast.error('Post ID is missing', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
      });
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.POSTS.DELETE(postId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove post');
      }

      const posts = await response.json();
      dispatch(setPosts({ posts }));
      toast.success('Post deleted successfully', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
      });
    } catch (error) {
      toast.error(error.message || 'Failed to remove post', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
      });
    }
  };

  return (
    <Box
      backgroundColor={palette.background.alt}
      borderRadius="0.75rem"
      mt="1rem"
      p="1rem"
    >
      <FlexBetween gap="1rem">
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" userId={postUserId} />
          <Box>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: primary,
                  cursor: 'pointer',
                },
              }}
              onClick={() => {
                navigate(`/profile/${postUserId}`);
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {location}
            </Typography>
          </Box>
        </FlexBetween>
        {!isOwnPost && (
          <Tooltip title={isFriend ? "Remove Friend" : "Add Friend"}>
            <span>
              <IconButton
                onClick={patchFriend}
                disabled={isLoading}
                sx={{
                  backgroundColor: isFriend ? palette.error.main : primary,
                  p: '0.6rem',
                  '&:hover': {
                    backgroundColor: isFriend ? palette.error.dark : palette.primary.dark,
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isFriend ? (
                  <PersonRemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <PersonAddIcon sx={{ color: '#fff' }} />
                )}
              </IconButton>
            </span>
          </Tooltip>
        )}
        {isOwnPost && (
          <IconButton
            onClick={handleRemovePost}
            sx={{ color: palette.error.main }}
          >
            <DeleteOutlined />
          </IconButton>
        )}
      </FlexBetween>

      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={API_ENDPOINTS.ASSETS.IMAGE(picturePath)}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteIcon sx={{ color: 'primary.main', fontSize: '1.5rem' }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: '1.5rem' }} />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </Box>
  );
};

export default PostWidget;
