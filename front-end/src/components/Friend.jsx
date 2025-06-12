import React, { useState } from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { setFriends } from 'state';
import { API_ENDPOINTS } from '../config/api.config';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.posts.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(API_ENDPOINTS.USERS.FRIEND(_id, friendId), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: primaryLight,
                cursor: 'pointer',
              },
            }}
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
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
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: main }} />
        ) : (
          <PersonAddOutlined sx={{ color: main }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
