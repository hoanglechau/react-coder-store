import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';
import logoImg from '../logo.png';

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );

  if (disabledLink) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
