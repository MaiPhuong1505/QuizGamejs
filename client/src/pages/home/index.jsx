import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import { Box, Button, Divider, Grid, Typography, Paper } from '@mui/material';
import './Home.scss';
import QuizTime from '../../assets/quiz-time.jpg';
import { useNavigate } from 'react-router-dom';
import Background from '../../assets/background small size.png';

const Home = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  };
  return (
    <>
      {/* <Header /> */}
      <Paper className="home">
        {/* <div>
          <img
            src={Background}
            style={{ width: '100vw', height: 'auto', position: 'absolute', zIndex: 0, transform: 'translateY(-210px)' }}
          />
        </div> */}
        <Grid container className="home-inner">
          <Grid item xs={8}>
            <Typography className="brand-home" color="primary" variant="h3">
              QuizNow
            </Typography>
            <Typography className="slogan" color="primary">
              Study and Play with QuizNow
            </Typography>
            <Box sx={{ marginTop: 4, '& button': { mr: 3, width: '155px', height: '55px', fontSize: 'large' } }}>
              <Button variant="contained">Get Started</Button>
              <Button variant="contained" onClick={redirectToLogin}>
                Log In
              </Button>
            </Box>
          </Grid>
          {/* <Grid item xs={12}>
            <Divider sx={{ marginTop: 1, marginBottom: '5px' }} />
          </Grid> */}
        </Grid>
      </Paper>
    </>
  );
};
{
  /* <Grid item xs={4}>
            <img src={QuizTime} alt="Main" />
          </Grid> */
}
export default Home;
