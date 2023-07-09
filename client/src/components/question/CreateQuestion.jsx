import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormControl,
  InputLabel,
  Radio,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { RadioButtonUnchecked, Save, ArrowBack } from '@mui/icons-material';
import UploadImage from '../UploadImage';
import { quizServices } from '../../services/quizServices';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { QUESTION_DIFFICULTY } from '../../utils/constants';

const CreateQuestion = () => {
  const initialAnswersState = [
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
  ];
  const [questionData, setQuestionData] = useState({});
  const [questionContent, setQuestionContent] = useState('');
  const [difficulty, setDifficulty] = useState(QUESTION_DIFFICULTY.EASY);
  const [time, setTime] = useState(20);
  const [notifyText, setNotifyText] = useState('');
  const [multiple, setMultiple] = useState(false);
  const [answerOptions, setAnswerOptions] = useState(initialAnswersState);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [multiSelectedAnswers, setMultiSelectedAnswers] = useState([false, false, false, false]);
  const [imageURL, setImageURL] = useState('');

  const { user } = useSelector((state) => state);

  const navigate = useNavigate();

  const getImageURL = (url) => {
    setImageURL(url);
  };

  const handleAnswerChange = (index) => (event) => {
    if (notifyText) {
      setNotifyText('');
    }
    const newOptions = [...answerOptions];
    newOptions[index].answer = event.target.value;
    setAnswerOptions(newOptions);
  };

  const handleRadioChange = (index) => (event) => {
    if (notifyText) {
      setNotifyText('');
    }
    setSelectedAnswer(index);
    const newOptions = [...answerOptions];
    newOptions.forEach((option, i) => {
      newOptions[i].isCorrect = i === index;
    });
    setAnswerOptions(newOptions);
  };

  const handleCheckboxChange = (index) => (event) => {
    if (notifyText) {
      setNotifyText('');
    }
    console.log('event index', index);
    const newSelectedAnswers = [...multiSelectedAnswers];
    newSelectedAnswers[index] = event.target.checked;
    setMultiSelectedAnswers(newSelectedAnswers);
    const newOptions = [...answerOptions];
    newOptions[index].isCorrect = event.target.checked;
    setAnswerOptions(newOptions);
  };

  const handleChangeContent = (e) => {
    if (notifyText) {
      setNotifyText('');
    }
    setQuestionContent(e.target.value);
  };
  const handleChangeTime = (e) => {
    if (notifyText) {
      setNotifyText('');
    }
    setTime(e.target.value);
  };
  const handleChangeDifficulty = (e) => {
    if (notifyText) {
      setNotifyText('');
    }
    setDifficulty(e.target.value);
  };
  const handleChangeMultiple = (e) => {
    setAnswerOptions(initialAnswersState);
    setMultiple(e.target.checked);
  };

  //LIST TODO: create question
  const handleSubmit = async () => {
    const newAnswerOption = answerOptions.filter((option) => option.answer != '').map((option) => option);

    if (!questionContent) {
      setNotifyText('Please fill in question content');
      return;
    }
    if (newAnswerOption.length < 2) {
      setNotifyText('Please input more answer options');
      return;
    }
    if (!newAnswerOption.find((option) => option.isCorrect === true)) {
      setNotifyText('Please select correct answers');
      return;
    }
    const sendData = { questionContent, multiple, imageURL, time, difficulty, answerOptions: newAnswerOption };

    console.log('answerOptions in create question', answerOptions);
    console.log('sendData in create question', sendData);
    const response = await quizServices.createQuestion(sendData, user?.token);
    if (response.data) {
      navigate('');
    }
  };

  return (
    <>
      <Box
        component={Paper}
        sx={{
          padding: 3,
          margin: 'auto',
          marginTop: 3,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          maxWidth: '80vw',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <UploadImage
              height="15vw"
              userID={user.user._id}
              username={user.user.username}
              type="question"
              getData={getImageURL}
            />
          </Grid>
          <Grid item xs={8}>
            <Divider />
            <Typography>
              Question content<span style={{ color: '#E25B45' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              margin="dense"
              type={'text'}
              placeholder="Question content"
              variant="standard"
              name="question"
              onChange={handleChangeContent}
            ></TextField>
            <FormControlLabel
              control={<Checkbox onChange={handleChangeMultiple} checked={multiple} />}
              label="Multiple correct answers"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>
                  Time (seconds) <span style={{ color: '#E25B45' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Difficulty<span style={{ color: '#E25B45' }}>*</span>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ marginBottom: '16px', width: '100%' }} size="small">
                  <InputLabel id="time"></InputLabel>
                  <Select label="" name="time" onChange={handleChangeTime} value={time}>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={45}>45</MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                    <MenuItem value={75}>75</MenuItem>
                    <MenuItem value={75}>90</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ marginBottom: '16px', width: '100%' }} size="small">
                  <InputLabel id="time"></InputLabel>
                  <Select label="" name="difficulty" onChange={handleChangeDifficulty} value={difficulty}>
                    <MenuItem value={QUESTION_DIFFICULTY.EASY}>{QUESTION_DIFFICULTY.EASY}</MenuItem>
                    <MenuItem value={QUESTION_DIFFICULTY.MEDIUM}>{QUESTION_DIFFICULTY.MEDIUM}</MenuItem>
                    <MenuItem value={QUESTION_DIFFICULTY.DIFFICULT}>{QUESTION_DIFFICULTY.DIFFICULT}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {answerOptions.map((option, index) => (
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }} key={index}>
                  <TextField
                    fullWidth
                    margin="dense"
                    type={'text'}
                    variant="outlined"
                    placeholder={`Option ${index + 1}`}
                    value={option.answer}
                    onChange={handleAnswerChange(index)}
                  />

                  {multiple ? (
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleCheckboxChange(index)} checked={multiSelectedAnswers[index]} />
                      }
                      label=""
                      sx={{ margin: 0 }}
                    />
                  ) : (
                    <FormControlLabel
                      control={
                        <Radio checked={selectedAnswer === index} onChange={handleRadioChange(index)} value="true" />
                      }
                      label=""
                      sx={{ margin: 0 }}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <Typography color={'error'}>{notifyText}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                // marginY: 3,
              }}
            >
              <Button variant="contained" endIcon={<Save />} onClick={handleSubmit}>
                Save
              </Button>
              <Button variant="outlined" endIcon={<ArrowBack />}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateQuestion;
