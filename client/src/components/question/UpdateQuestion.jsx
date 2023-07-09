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
import { useParams } from 'react-router';

const UpdateQuestion = () => {
  const { id } = useParams();

  const [questionData, setQuestionData] = useState({});
  const [notifyText, setNotifyText] = useState('');
  const handleChangeInput = (e) => {
    const answerOptionsElement = ['answerOptions', 'option0', 'option1', 'option2', 'option3'];
    let answerOptions = [];
    if (notifyText) {
      setNotifyText('');
    }
    const { name, value } = e.target;
    console.log('name', name, 'value', value);
    if (answerOptionsElement.includes(name)) {
      //LIST TODO: check value of option textfield and radio button
    } else {
      setQuestionData({ ...questionData, [name]: value });
    }
  };

  //LIST TODO: get question by id
  // useEffect(() => {}, []);
  //LIST TODO: update question
  const handleSubmit = () => {};

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
            <UploadImage height="15vw" />
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
              onChange={handleChangeInput}
            ></TextField>
            <FormControlLabel control={<Checkbox />} label="Multiple correct answers" />
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
                  <Select label="" name="time">
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={45}>45</MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ marginBottom: '16px', width: '100%' }} size="small">
                  <InputLabel id="time"></InputLabel>
                  <Select label="" name="difficulty">
                    <MenuItem value={'Easy'}>Easy</MenuItem>
                    <MenuItem value={'Medium'}>Medium</MenuItem>
                    <MenuItem value={'Difficult'}>Difficult</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="dense"
                  type={'text'}
                  placeholder="Option A"
                  variant="outlined"
                  name="option0"
                />
                <Radio value={'option0'} name="correctAnswerOption" />
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="dense"
                  type={'text'}
                  placeholder="Option B"
                  variant="outlined"
                  name="option1"
                />
                <Radio value={'option1'} name="correctAnswerOption" />
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="dense"
                  type={'text'}
                  placeholder="Option C"
                  variant="outlined"
                  name="option2"
                />
                <Radio value={'option2'} name="correctAnswerOption" />
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="dense"
                  type={'text'}
                  placeholder="Option D"
                  variant="outlined"
                  name="option3"
                />
                <Radio value={'option3'} name="correctAnswerOption" />
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />
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

export default UpdateQuestion;
