import { useState } from 'react';
import { Box, Button, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { API_ENDPOINTS } from '../config/api.config';
import { setPost, setPosts } from '../state';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const loggedInUserId = useSelector((state) => state.auth.user?._id);
  const isLiked = Boolean(loggedInUserId && likes?.[loggedInUserId]);
  const likeCount = Object.keys(likes || {}).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    if (!loggedInUserId) {
      toast.error('Please log in to like posts', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    if (!postId) {
      toast.error('Post ID is missing', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
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
        },
      });
    }
  };

  const handleRemovePost = async () => {
    if (!loggedInUserId) {
      toast.error('Please log in to remove posts', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    if (!postId) {
      toast.error('Post ID is missing', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
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
        },
      });
    } catch (error) {
      toast.error(error.message || 'Failed to remove post', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
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
          <UserImage image={userPicturePath} userId={postUserId} />
          <Box>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              onClick={() => {
                navigate(`/profile/${postUserId}`);
              }}
              sx={{
                '&:hover': {
                  color: primary,
                  cursor: 'pointer',
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={palette.neutral.medium}>{location}</Typography>
          </Box>
        </FlexBetween>
        {loggedInUserId === postUserId && (
          <IconButton
            onClick={() => handleRemovePost(postId)}
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
