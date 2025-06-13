import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import WidgetWrapper from './WidgetWrapper';
import { API_ENDPOINTS } from '../config/api.config';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import toast from 'react-hot-toast';

const UserWidget = ({ userId, name, subtitle, picturePath }) => {
  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.PROFILE(userId), {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user profile');
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error(error.message || 'Failed to fetch user profile', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId, token]); // Add dependencies

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} userId={userId} />
          <Box>
            <Typography
              variant="h4"
              color={main}
              fontWeight="500"
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Box display="flex" alignItems="center" gap="0.5rem">
              <LocationOnIcon sx={{ fontSize: '0.75rem', color: medium }} />
              <Typography color={medium} fontSize="0.75rem">
                {location}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="0.5rem">
              <WorkIcon sx={{ fontSize: '0.75rem', color: medium }} />
              <Typography color={medium} fontSize="0.75rem">
                {occupation}
              </Typography>
            </Box>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src={API_ENDPOINTS.ASSETS.IMAGE('twitter.png')} alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src={API_ENDPOINTS.ASSETS.IMAGE('linkedin.png')} alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
