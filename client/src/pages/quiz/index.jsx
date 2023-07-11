import React, { useEffect, useState } from 'react';
import CreateQuiz from './CreateQuiz.jsx';
import { Grid, Toolbar, Button, Box, Paper, Typography, Stack, Divider, Skeleton } from '@mui/material';
import CreateQuestion from '../../components/question/CreateQuestion.jsx';
import { quizServices } from '../../services/quizServices.js';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AddCircleOutline, CheckCircle, Circle, CircleOutlined, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getQuiz } from '../../redux/actions/quizAction.js';

const QuizPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state);
  const { quizReducer } = useSelector((state) => state);
  console.log('storeQuiz', quizReducer.storeQuiz);
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const handleEditQuiz = () => {
    navigate(`/updateQuiz/${id}`);
  }; //redirect to page update quiz

  const handleCreateQuestion = () => {
    navigate(`/createQuestion`);
  }; //redirect to page create question

  const handleEditQuestion = () => {
    navigate(`/updateQuestion/${id}`);
  }; //redirect to page update question
  useEffect(() => {
    // const getQuizById = async () => {
    //   try {
    //     const response = await quizServices.getQuizById(id, user?.token);
    //     if (response.data.quiz) {
    //       setQuiz(response.data.quiz);
    //       console.log('response.data.quiz', response.data.quiz);
    //       setQuestions(response.data.quiz.questions);
    //       console.log('response.data.quiz.questions', typeof response.data.quiz.questions);
    //     }
    //   } catch (error) {
    //     console.log('getQuizById', error);
    //   }
    // };
    // getQuizById();
    if (user.token && id) {
      dispatch(getQuiz(id, user.token));
    }
  }, []);
  useEffect(() => {
    setQuiz(quizReducer.storeQuiz);
  }, [quizReducer.storeQuiz]);
  useEffect(() => {
    setQuestions(quiz.questions);
  }, [quiz]);
  // console.log('response.data.quiz', quiz.questions[0]);
  return (
    <>
      <Grid container sx={{ padding: 4, backgroundColor: '#FAFAFA' }}>
        <Grid item xs={4}>
          <Paper sx={{ marginRight: 3, padding: 2, maxWidth: '28vw' }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center', border: '2px dashed #D9D9D9' }}>
                {/* {Object.keys(quiz).length > 0 ? ( */}
                <img src={quiz?.imageURL} style={{ maxWidth: '70%', height: 'auto' }} />
                {/* ) : (
                  <Skeleton />
                )} */}
              </Box>
              {/* <Divider sx={{ marginY: 2, border: '1px dashed #FAFAFA' }} /> */}
              <Typography variant="h5">{quiz?.title}</Typography>
              <Typography>{quiz?.description}</Typography>
              <Typography>{quiz?.visibility}</Typography>
              <Typography>{quiz?.category?.categoryName}</Typography>
              <Button variant="contained" endIcon={<Edit />} onClick={handleEditQuiz}>
                Edit
              </Button>
              {/* <Typography>{quiz.description}</Typography>
              <Typography>{quiz.description}</Typography> */}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
            <Button variant="contained" endIcon={<AddCircleOutline />} onClick={handleCreateQuestion}>
              Add new question
            </Button>
          </Box>
          <Stack>
            {/* {Object.keys(quiz).length > 0 ? ( */}
            {questions?.map((question, index) => (
              <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6">Question {index + 1}</Typography>
                        <Typography>{question.time} seconds</Typography>
                        <Typography>{question.difficulty}</Typography>
                      </Box>
                      <Box sx={{ '& button': { mr: 1 } }}>
                        <Button variant="contained" endIcon={<Edit />} onClick={handleEditQuestion}>
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
                  <Divider sx={{ marginTop: 2 }} />
                  <Typography>{question.explaination}</Typography>
                </Grid>
              </Paper>
            ))}
            {/* ) : (
              <Skeleton />
            )} */}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default QuizPage;
