import React, { useState } from 'react';
import { Box, Button, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';
import PostWidget from 'components/PostWidget';
import { API_ENDPOINTS } from '../config/api.config';
import { setPosts } from 'state';
import { useNavigate } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';

const MyPostWidget = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState('');
  const { palette } = useTheme();
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('description', post);
    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    const response = await fetch(API_ENDPOINTS.POSTS.CREATE, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost('');
    navigate('/home');
  };

  return (
    <PostWidget
      postId={_id}
      postUserId={_id}
      name={`${firstName} ${lastName}`}
      description={post}
      location={location}
      picturePath={picturePath}
      userPicturePath={picturePath}
    />
  );
});

export default MyPostWidget;
