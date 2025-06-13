import React from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { API_ENDPOINTS } from '../config/api.config';
import { setFriends } from '../state';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const light = palette.primary.light;

  const patchFriend = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.FRIEND(_id, friendId), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update friend status');
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      toast.error(error.message || 'Failed to update friend status', {
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
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" userId={friendId} />
        <Box>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: light,
                cursor: 'pointer',
              },
            }}
            onClick={() => {
              navigate(`/profile/${friendId}`);
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: light, p: '0.6rem' }}
      >
        <img src="../assets/user-plus.svg" alt="add friend" />
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
