import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../../state';

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const activeProfileId = useSelector((state) => state.activeProfileId);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.friends);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFriends = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/friends`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
      } else {
        dispatch(setFriends({ friends: [] }));
        setError('Failed to fetch friends');
      }
    } catch (err) {
      setError('An error occurred while fetching friends.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      <Box
        display="flex"
        flexDirection="column"
        gap="1.5rem"
      >
        {Array.isArray(friends) &&
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
              isIconVisible={activeProfileId === user._id}
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
