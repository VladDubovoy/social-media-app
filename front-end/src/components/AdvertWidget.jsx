import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import { API_ENDPOINTS } from '../config/api.config';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <Typography color={dark} variant="h5" fontWeight="500" mb="1rem">
        Sponsored
      </Typography>
      <Box>
        <img
          width="100%"
          height="auto"
          alt="advert"
          style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
          src={API_ENDPOINTS.ASSETS.IMAGE('info4.jpeg')}
        />
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium} m="0.5rem 0">
          Your pathway to stunning and immaculate beauty and made sure your skin
          is exfoliating skin and shining like light.
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
