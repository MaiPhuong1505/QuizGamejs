import { Delete, Edit, PlayCircleOutline } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socketClient';
import { QUIZ_VISIBILITY } from '../../utils/constants';

const Quiz = ({ quiz }) => {
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const play = () => {
    navigate(`/playing/${quiz._id}`);
    const data = { quizId: quiz._id, hostId: user.user._id };
    socket.emit('Get_PIN_code_from_server', data);
  };
  const handleEditQuiz = () => {
    navigate(`/quiz/${quiz._id}`);
  };
  return (
    <>
      <Paper sx={{ padding: 2 }}>
        <Stack>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">{quiz.title}</Typography>
            <Box sx={{ '& button': { mr: 1 } }}>
              {quiz.questions?.length > 0 && quiz.visibility === QUIZ_VISIBILITY.PUBLIC && (
                <Button variant="contained" endIcon={<PlayCircleOutline />} onClick={play}>
                  Play
                </Button>
              )}
              <Button variant="outlined" endIcon={<Edit />} onClick={handleEditQuiz}>
                Edit
              </Button>
              <Button variant="outlined" endIcon={<Delete />} color="error">
                Delete
              </Button>
            </Box>
          </Box>
          <Divider sx={{ margin: '16px 0' }} />
          <Typography>{quiz.description}</Typography>
          <Typography>{quiz.questions.length === 1 ? '1 question' : `${quiz.questions.length} questions`} </Typography>
        </Stack>
      </Paper>
    </>
  );
};

export default Quiz;
