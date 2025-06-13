import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import WidgetWrapper from './WidgetWrapper';
import advertisements from '../data/advertisements.json';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.advertisements.length);
      setTimeout(() => setLoading(false), 300); // Short delay for transition
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentAd = advertisements.advertisements[currentIndex];

  return (
    <WidgetWrapper>
      <Typography color={main} fontWeight="500" fontSize="1.1rem" mb="1rem">
        Sponsored
      </Typography>
      <Box>
        <img
          width="100%"
          height="auto"
          alt={currentAd.alt}
          style={{ 
            borderRadius: '0.75rem', 
            margin: '0.75rem 0',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          src={currentAd.url}
        />
        <Typography color={main}>{currentAd.title}</Typography>
        <Typography color={medium} m="0.5rem 0">
          {currentAd.description}
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
