import React from 'react';
import CreateQuiz from '../../components/quiz/CreateQuiz.jsx';
import { Grid, Toolbar, Button, Box } from '@mui/material';
import CreateQuestion from '../../components/question/CreateQuestion.jsx';

const QuizPage = () => {
  return (
    <>
      <Toolbar />
      <Grid container sx={{ backgroundColor: '#FAFAFA', padding: 4, minHeight: '100vh', boxSizing: 'border-box' }}>
        <Grid item xs={4}>
          <CreateQuiz />
        </Grid>
        <Grid item xs={8}>
          <CreateQuestion />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginBottom: 3,
            }}
          >
            <Button
              variant="contained"
              // onClick={handleSubmit}
            >
              Save
            </Button>
            <Button variant="outlined">Cancel</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default QuizPage;
