import React from 'react';
import Header from '../Header';
import { Box, Toolbar } from '@mui/material';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', boxSizing: 'border-box', backgroundColor: '#FAFAFA' }}>
        <Toolbar />
        {children}
      </Box>
    </>
  );
};

export default DefaultLayout;
