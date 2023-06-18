import React from 'react';
import Header from '../Header';
import { Box, Toolbar } from '@mui/material';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ padding: 4, minHeight: '100vh', boxSizing: 'border-box' }}>
        <Toolbar />
        {children}
      </Box>
    </>
  );
};

export default DefaultLayout;
