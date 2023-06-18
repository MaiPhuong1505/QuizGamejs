import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import './Login.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyboardBackspace } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../redux/actions/userAction';

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [userData, setUserData] = useState({ email: '', password: '', fullname: '', username: '' });
  const [notifyText, setNotifyText] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  console.log('user', user);
  useEffect(() => {
    if (user.token) navigate('/profile');
    else navigate('/login');
  }, [user.token]);

  const validate = (key, values) => {
    const EMAIL_FORMAT = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (key === 'email' && !EMAIL_FORMAT.test(values)) {
      setNotifyText('Invalid Email');
      return true;
    }
    return false;
  };
  const handleChangeInput = (e) => {
    setNotifyText('');
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const { fullname, email, password, username } = userData;
    if (signUp && (!fullname || !email || !password || !username)) {
      setNotifyText('Please fill in all information');
      return;
    } else if (!signUp && (!email || !password)) {
      setNotifyText('Please fill in all information');
      return;
    }
    if (validate('email', email)) {
      return;
    }
    if (signUp) {
      dispatch(register(userData));
    } else {
      dispatch(login({ email, password }));
    }
  };
  return (
    // <Container component="main" maxWidth="lg">
    <div className="background">
      <Box sx={{ borderRadius: 5, zIndex: 100 }}>
        <Grid container sx={{ minWidth: '65vw' }}>
          <Grid
            item
            xs={6}
            sx={{
              backgroundImage:
                'url(https://img.freepik.com/free-vector/quiz-time-logo-with-speech-bubble-symbols-concept-questionnaire-show-sing-quiz-time-button-question-competition_100456-1285.jpg?size=626&ext=jpg)',
              backgroundRepeat: 'no-repeat',
              maxWidth: '300px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '4px',
              boxShadow:
                '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
            }}
          />

          <Grid item xs={6} component={Paper} elevation={6}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                {signUp ? 'Sign Up' : 'Log In'}
              </Typography>
              <Typography color="error">{notifyText}</Typography>
              <Box
                component="form"
                noValidate
                // onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                {signUp && (
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="fullname"
                      label="Fullname"
                      name="fullname"
                      size="small"
                      autoFocus
                      onChange={handleChangeInput}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      size="small"
                      onChange={handleChangeInput}
                    />
                  </>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size={signUp ? 'small' : 'medium'}
                  onChange={handleChangeInput}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size={signUp ? 'small' : 'medium'}
                  onChange={handleChangeInput}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
                  {signUp ? 'Sign Up' : 'Log In'}
                </Button>
                <Grid container>
                  <Grid item xs={5}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                      <KeyboardBackspace />
                      Home Page
                    </Link>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => setSignUp(!signUp)}
                    >
                      {signUp ? 'Already have an account? Log in' : "Don't have an account? Sign Up"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
    </div>

    // </Container>
  );
};

export default Login;
