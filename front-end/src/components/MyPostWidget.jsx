import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import { API_ENDPOINTS } from "../config/api.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const { _id, picturePath, firstName, lastName } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  const handlePost = async () => {
    if (!post) {
      toast.error('Please enter some text to post', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('userId', _id);
      formData.append('description', post);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('userPicturePath', picturePath);
      if (image) {
        formData.append('picture', image);
        formData.append('picturePath', image.name);
      }

      const response = await fetch(API_ENDPOINTS.POSTS.CREATE, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      // Fetch updated feed after successful post creation
      const feedResponse = await fetch(API_ENDPOINTS.POSTS.FEED, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (!feedResponse.ok) {
        throw new Error('Failed to fetch updated feed');
      }

      const updatedPosts = await feedResponse.json();
      dispatch(setPosts({ posts: updatedPosts }));
      
      setPost('');
      setImage(null);
      setIsImage(false);
      toast.success('Your post has been shared successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
        icon: '✨',
      });
      
      // Redirect to home page
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Failed to create post', {
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
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} userId={_id} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "80%",
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'transparent'}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,1)' : 'transparent',
            },
            '& .MuiInputBase-input': {
              color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.neutral.dark,
              '&::placeholder': {
                color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.neutral.medium,
                opacity: 0.7,
              },
            },
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${theme.palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ 
                    "&:hover": { 
                      cursor: "pointer",
                      borderColor: theme.palette.primary.light,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography color={mediumMain}>Add Image Here</Typography>
                  ) : (
                    <FlexBetween>
                      <Typography color={theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.neutral.dark}>
                        {image.name}
                      </Typography>
                      <EditOutlined sx={{ color: theme.palette.primary.main }} />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ 
                      width: "15%",
                      color: theme.palette.mode === 'dark' ? theme.palette.error.light : theme.palette.error.main,
                      '&:hover': {
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween 
          gap="0.25rem" 
          onClick={() => setIsImage(!isImage)}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          }}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ 
              "&:hover": { 
                color: theme.palette.primary.main,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Image
          </Typography>
        </FlexBetween>

        <Button
          disabled={!post.trim() || isLoading}
          onClick={handlePost}
          sx={{
            color: theme.palette.background.alt,
            backgroundColor: theme.palette.primary.main,
            borderRadius: "3rem",
            padding: "0.5rem 2rem",
            transition: 'all 0.3s ease',
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
            "&:disabled": {
              backgroundColor: theme.palette.neutral.medium,
              color: theme.palette.neutral.dark,
              transform: 'none',
              boxShadow: 'none',
            },
          }}
        >
          {isLoading ? "POSTING..." : "POST"}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
