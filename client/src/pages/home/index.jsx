import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import './Home.css';
import QuizTime from '../../assets/quiz-time.jpg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => {
    console.log('state', state);
    return state;
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (user.token) navigate('/profile');
  }, [user.token]);

  const redirectToLogin = () => {
    navigate('/login');
  };
  return (
    <>
      <Header />
      <Grid container className="home">
        <Grid item xs={8}>
          <Typography className="brand-home" color="primary" variant="h3">
            QuizGame
          </Typography>
          <Typography className="slogan" color="primary">
            Study and Play with QuizGame
          </Typography>
          <Box sx={{ marginTop: 4, '& button': { mr: 3, width: '155px', height: '55px', fontSize: 'large' } }}>
            <Button variant="contained">Get Started</Button>
            <Button variant="contained" onClick={redirectToLogin}>
              Log In
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <img src={QuizTime} alt="Main" />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginTop: 1, marginBottom: '5px' }} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
