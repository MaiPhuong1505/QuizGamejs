import { Box, Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h1">Page Not Found</Typography>
      </Box>
    </>
  );
};

export default NotFound;
