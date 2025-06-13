import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, useTheme, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { API_ENDPOINTS } from '../config/api.config';
import { setFriends } from '../state';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.user?.friends) || [];
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const light = palette.primary.light;

  // Check if the current user is friends with this user
  const isFriend = Array.isArray(friends) && friends.includes(friendId);

  const patchFriend = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
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
      <Tooltip title={isFriend ? "Remove Friend" : "Add Friend"}>
        <IconButton
          onClick={patchFriend}
          disabled={isLoading}
          sx={{
            backgroundColor: isFriend ? palette.error.main : light,
            p: '0.6rem',
            '&:hover': {
              backgroundColor: isFriend ? palette.error.dark : palette.primary.main,
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
      </Tooltip>
    </FlexBetween>
  );
};

export default Friend;
