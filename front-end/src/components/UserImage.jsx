import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api.config';

const UserImage = React.memo(({ image, size = '60px', userId }) => {
  const navigate = useNavigate();
  
  const handleClick = useCallback(() => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  }, [navigate, userId]);

  return (
    <Box
      width={size}
      height={size}
      onClick={handleClick}
      sx={{
        cursor: userId ? 'pointer' : 'default',
        '&:hover': {
          opacity: userId ? 0.8 : 1,
        },
      }}
    >
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={API_ENDPOINTS.ASSETS.IMAGE(image)}
      />
    </Box>
  );
});

export default UserImage;
