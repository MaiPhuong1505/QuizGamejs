import React from 'react';
import Quiz from '../../components/quiz';
import { Box, Button, Divider, Grid, IconButton, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);

  const navigate = useNavigate();
  const createQuiz = () => {
    navigate('/quiz');
  };
  return (
    <>
      <Toolbar />
      <Grid
        container
        spacing={6}
        sx={{ backgroundColor: '#FAFAFA', padding: 4, minHeight: '100vh', boxSizing: 'border-box' }}
      >
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ padding: 2, maxWidth: '300px' }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="primary">
                User Profile
              </Typography>
              <Divider />
              <Typography>{user.user.fullname}</Typography>
              <Typography>{user.user.email}</Typography>
              <Divider />
              <Button variant="contained" endIcon={<AddCircleOutline />} onClick={createQuiz}>
                Create a new quiz
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography>You have 2 quizzes</Typography>
            <Quiz />
            <Quiz />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
