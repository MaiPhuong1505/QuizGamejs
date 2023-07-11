import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import React, { useEffect, useState } from 'react';
import { quizServices } from '../../services/quizServices';

import { useSelector } from 'react-redux';
const CreateQuizAuto = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const { user } = useSelector((state) => state);
  console.log('user in create auto', user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    try {
      const quizzesCheckeds = quizzes.filter((quiz) => quiz.checked);
      const requirement = quizzesCheckeds.map((quizzesChecked) => ({
        quizId: quizzesChecked?._id,
        numberOfQuestion: quizzesChecked?.numberOfQuestion,
      }));
      await quizServices.createQuizAutoApi(
        {
          quizTitle,
          user: user?.user?._id,
          requirement,
        },
        user?.token,
      );

      navigate('/profile');
    } catch (error) {
      console.log('error', error);
      navigate('/404');
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('quizzes', quizzes);

  const isCheckALL = quizzes.every((quiz) => quiz?.checked);
  const setQuizzesChecked = (id) => {
    const newQuiz = quizzes.map((quiz) => {
      if (quiz._id !== id) {
        return quiz;
      } else if (quiz.checked) {
        return { ...quiz, checked: !quiz?.checked, numberOfQuestion: '' };
      } else {
        return { ...quiz, checked: !quiz?.checked, numberOfQuestion: '1' };
      }
    });
    setQuizzes(newQuiz);
  };

  const setQuizzesCheckedAll = () => {
    setQuizzes((pre) => pre.map((item) => ({ ...item, checked: !isCheckALL })));
  };

  const handleClear = () => {
    setQuizzes((pre) => pre.map((item) => ({ ...item, checked: false, numberOfQuestion: '' })));
  };

  const setNumberOfQuestion = (id, number) => {
    setQuizzes((pre) =>
      pre.map((item) => (item._id !== id ? item : { ...item, checked: true, numberOfQuestion: number })),
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === '.') {
      e.preventDefault();
      return;
    }
  };

  return (
    <Box>
      <Grid container sx={{ height: '100%', backgroundColor: 'white', paddingX: '55px' }} spacing={5}>
        <Grid item md={8} sx={{ height: '100%' }}>
          <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <Grid item xs={2}>
              <Typography className="question">Quiz name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                value={quizTitle}
                onChange={(e) => {
                  setQuizTitle(e?.target?.value || '');
                }}
                size="small"
                margin="dense"
                type={'text'}
                variant="outlined"
                name="option1"
              />
            </Grid>
          </Grid>
          <Table
            sx={{ minWidth: 650, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px', height: '100%' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Checkbox onClick={() => setQuizzesCheckedAll()} checked={isCheckALL} />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: '700' }}>
                  STT
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: '700' }}>
                  Quiz
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: '700' }}>
                  Number of question
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map((quiz, index) => (
                <TableRow key={quiz?.stt} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    <Checkbox checked={!!quiz?.checked} onClick={() => setQuizzesChecked(quiz?._id)} />
                  </TableCell>
                  <TableCell align="center">{++index}</TableCell>
                  <TableCell align="center">{quiz?.title}</TableCell>
                  <TableCell align="center">
                    <TextField
                      sx={{ textAlign: 'center' }}
                      size="small"
                      type="number"
                      value={quiz.numberOfQuestion}
                      onChange={(e) => setNumberOfQuestion(quiz?._id, e.target.value)}
                      onKeyDown={handleKeyDown}
                      inputProps={{
                        style: { appearance: 'none' },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item md={4} sx={{ marginY: '80px' }}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2px 22px',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: '700' }}>Preview </Typography>
              <List>
                {quizzes.map(
                  (qizz) =>
                    qizz.checked && (
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: '26px' }}>
                          <CircleRoundedIcon sx={{ color: '#00B8F1', fontSize: '12px' }} />
                        </ListItemIcon>
                        Add {qizz?.numberOfQuestion || '0'} random questions in {qizz?.title}
                      </ListItem>
                    ),
                )}
              </List>
            </CardContent>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}>
              <LoadingButton
                color="secondary"
                onClick={handleClick}
                loading={loading}
                loadingPosition="start"
                sx={{
                  padding: '5px 7px',
                  color: '#fff',
                  width: '100px',
                  background: '#00B8F1',
                  '&:hover': {
                    background: '#2196f3',
                    color: '#fff',
                  },
                  '&.Mui-disabled': {
                    background: '#93a4a9',
                    border: '1px solid #93a4a9',
                    color: '#fff',
                    opacity: 0.5,
                  },
                }}
                startIcon={<SaveIcon />}
              >
                <span>Save</span>
              </LoadingButton>
              <Button
                variant="outlined"
                // sx={{ padding: '5px 7px', border: '1px solid #00B8F1', color: '#00B8F1', width: '100px' }}
                onClick={handleClear}
              >
                CLEAR
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateQuizAuto;
