import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import FlashCard from './FlashCard';
import CreateQuizAuto from './CreateQuizAuto';

const index = () => {
  return (
    <Box>
      <Typography
        sx={{
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25);',
          padding: '25px 0px 25px 39px',
          fontSize: '32px',
        }}
      >
        QuizGame
      </Typography>
      {/* <FlashCard /> */}
      <CreateQuizAuto />
    </Box>
  );
};

export default index;
