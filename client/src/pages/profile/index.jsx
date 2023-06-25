import React, { useEffect, useState } from 'react';
import Quiz from '../../components/quiz/Quiz';
import { Box, Button, Divider, Grid, IconButton, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { quizServices } from '../../services/quizServices';

const Profile = () => {
  const dispatch = useDispatch();
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const getQuizList = async () => {
    try {
      const response = await quizServices.getQuizzes(user?.user?._id, user?.token);
      if (response.data.quizzes) {
        setQuizzes(response.data.quizzes);
      }
    } catch (error) {
      console.log('getQuizList', error);
    }
  };
  useEffect(() => {
    getQuizList();
  }, []);

  const createQuiz = () => {
    navigate('/createQuiz');
  };
  return (
    <>
      <Grid container sx={{ padding: 4, backgroundColor: '#FAFAFA' }}>
        <Grid item xs={4}>
          <Paper sx={{ padding: 2, marginRight: 4, maxWidth: '300px' }}>
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
              <Button variant="contained" endIcon={<AddCircleOutline />} onClick={() => navigate('/autoCreateQuiz')}>
                Create quiz automatically
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography>You have {quizzes.length} quizzes</Typography>
            {quizzes.map((quiz) => (
              <Quiz key={quiz._id} quiz={quiz} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
