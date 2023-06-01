import { Delete, Edit, PlayCircleOutline } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const play = () => {
    navigate('/game');
  };
  return (
    <>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Stack>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Quiz Name</Typography>
            <Box sx={{ '& button': { mr: 1 } }}>
              <Button variant="contained" endIcon={<PlayCircleOutline />} onClick={play}>
                Play
              </Button>
              <Button variant="outlined" endIcon={<Edit />}>
                Edit
              </Button>
              <Button variant="outlined" endIcon={<Delete />} color="error">
                Delete
              </Button>
            </Box>
          </Box>
          <Divider sx={{ margin: '16px 0' }} />
          <Typography>Quiz Topic</Typography>
          <Typography>Number of question</Typography>
        </Stack>
      </Paper>
    </>
  );
};

export default Quiz;
