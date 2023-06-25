import React, { useEffect, useState } from 'react';
import CreateQuiz from '../../components/quiz/CreateQuiz.jsx';
import { Grid, Toolbar, Button, Box, Paper, Typography, Stack, Divider } from '@mui/material';
import CreateQuestion from '../../components/question/CreateQuestion.jsx';
import { quizServices } from '../../services/quizServices.js';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { CheckCircle, Circle, CircleOutlined, Delete, Edit } from '@mui/icons-material';

const QuizPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);

  const handleEditQuiz = () => {};
  useEffect(() => {
    const getQuizById = async () => {
      try {
        const response = await quizServices.getQuizById(id, user?.token);
        if (response.data.quiz) {
          setQuiz(response.data.quiz);
          console.log('response.data.quiz', response.data.quiz);
          setQuestions(response.data.quiz.questions);
          console.log('response.data.quiz.questions', typeof response.data.quiz.questions);
        }
      } catch (error) {
        console.log('getQuizById', error);
      }
    };
    getQuizById();
  }, []);
  // console.log('response.data.quiz', quiz.questions[0]);
  return (
    <>
      {/* <Grid container sx={{ backgroundColor: '#FAFAFA', padding: 4, minHeight: '100vh', boxSizing: 'border-box' }}>
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
      // </Grid> */}
      <Grid container sx={{ padding: 4, backgroundColor: '#FAFAFA' }}>
        <Grid item xs={4}>
          <Paper sx={{ marginRight: 3, padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', border: '2px dashed #D9D9D9' }}>
              <img src={quiz.imageURL} style={{ maxWidth: '70%', height: 'auto' }} />
            </Box>
            {/* <Divider sx={{ marginY: 2, border: '1px dashed #FAFAFA' }} /> */}
            <Typography variant="h5">{quiz.title}</Typography>
            <Typography>{quiz.description}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Stack>
            {questions.map((question, index) => (
              <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6">Question {index + 1}</Typography>
                      <Box sx={{ '& button': { mr: 1 } }}>
                        <Button variant="contained" endIcon={<Edit />} onClick={handleEditQuiz}>
                          Edit
                        </Button>
                        <Button variant="outlined" endIcon={<Delete />} color="error">
                          Delete
                        </Button>
                      </Box>
                    </Box>
                    <Divider sx={{ marginTop: 2 }} />
                  </Grid>
                  <Grid item xs={12}>
                    {question.question}
                  </Grid>
                  {question.answerOptions.map((option) => (
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {option.isCorrect ? <CheckCircle color="success" /> : <CircleOutlined color="primary" />}
                        <Typography>{option.answer}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default QuizPage;
