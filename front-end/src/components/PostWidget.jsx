import React, { useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import {
  ChatBubbleOutlineOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  ShareOutlined,
} from '@mui/icons-material';
import { API_ENDPOINTS } from '../config/api.config';
import { removePost, setPost } from 'state';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(API_ENDPOINTS.POSTS.LIKE(postId), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    const response = await fetch(API_ENDPOINTS.POSTS.DELETE(postId), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const deletedPost = await response.json();
    dispatch(removePost({ post: deletedPost }));
  };

  return (
    <Box
      backgroundColor={palette.background.alt}
      borderRadius="0.75rem"
      mt="1rem"
      p="1rem"
    >
      <FlexBetween mb="0.5rem">
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} />
          <Box>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={main} fontSize="0.75rem">
              {location}
            </Typography>
          </Box>
        </FlexBetween>
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
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton onClick={deletePost}>
          <ShareOutlined />
        </IconButton>
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
