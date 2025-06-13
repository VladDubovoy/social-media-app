import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import WidgetWrapper from './WidgetWrapper';
import Friend from './Friend';
import { API_ENDPOINTS } from '../config/api.config';
import { useSelector } from 'react-redux';

const FriendListWidget = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const currentUserFriends = useSelector((state) => state.auth.user?.friends) || [];

  const getFriends = async () => {
    const response = await fetch(API_ENDPOINTS.USERS.FRIENDS(userId), {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setFriends(data);
  };

  useEffect(() => {
    getFriends();
  }, [userId, token, currentUserFriends]); // Add currentUserFriends as a dependency

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
