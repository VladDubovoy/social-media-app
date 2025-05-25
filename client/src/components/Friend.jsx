import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends, setUser } from 'state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  isIconVisible,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const activeProfileId = useSelector((state) => state.activeProfileId);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend =
    Array.isArray(user.friends) &&
    user.friends.some((friend) => friend === friendId);

  async function updateUser() {
    const response = await fetch(`http://localhost:3001/users/${user._id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    dispatch(setUser({ user: data }));
  }

  async function patchMyFriend() {
    const response = await fetch(
      `http://localhost:3001/users/${user._id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
  }

  async function getFriends() {
    const response = await fetch(
      `http://localhost:3001/users/${activeProfileId}/friends`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  }

  async function handleButtonClick() {
    await patchMyFriend();
    await updateUser();
    await getFriends();
  }

  return (
    <FlexBetween gap="1rem">
      <FlexBetween gap="1rem">
        <UserImage
          image={userPicturePath}
          size="55px"
          userId={friendId}
        />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
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
          <Typography
            color={medium}
            fontSize="0.75rem"
          >
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {isIconVisible && (
        <IconButton
          onClick={handleButtonClick}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
