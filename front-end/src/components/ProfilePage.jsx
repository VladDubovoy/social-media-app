import React, { useCallback } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from 'components/Navbar';
import FriendListWidget from 'components/FriendListWidget';
import MyPostWidget from 'components/MyPostWidget';
import PostsWidget from 'components/PostsWidget';
import UserWidget from 'components/UserWidget';
import { setActiveProfile } from '../state';
import { API_ENDPOINTS } from '../config/api.config';

const ProfilePage = React.memo(() => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  const getUser = useCallback(async () => {
    const response = await fetch(API_ENDPOINTS.USERS.PROFILE(userId), {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    dispatch(setActiveProfile({ userId }));
  }, [userId, token, dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget
            userId={userId}
            picturePath={user.picturePath}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget />
          <Box m="2rem 0" />
          <PostsWidget
            userId={userId}
            isProfile
          />
        </Box>
      </Box>
    </Box>
  );
});

export default ProfilePage;
