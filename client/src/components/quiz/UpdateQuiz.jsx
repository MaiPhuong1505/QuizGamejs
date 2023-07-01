import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import CategorySelect from './CategorySelect';
import UploadImage from '../UploadImage';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBack, Save } from '@mui/icons-material';
import { QUIZ_VISIBILITY } from '../../utils/constants';
import { useParams } from 'react-router';

const UpdateQuiz = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  console.log('user in create quiz', user);
  const [categoryID, setCategoryID] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [notifyText, setNotifyText] = useState('');
  // const [selectedVisibility, setSelectedVisibility] = useState(QUIZ_VISIBILITY.PUBLIC)

  const [quizData, setQuizData] = useState({});

  const handleChangeInput = (e) => {
    if (notifyText) {
      setNotifyText('');
    }
    const { name, value } = e.target;
    console.log('name', name, 'value', value);
    setQuizData({ ...quizData, [name]: value });
  };
  const getCategory = (categoryId) => {
    setCategoryID(categoryId);
  };
  const getImageURL = (url) => {
    setImageURL(url);
  };
  //LIST TODO: Get quiz by id
  useEffect(() => {
    try {
    } catch (error) {}
  }, []);

  //LIST TODO: Update quiz
  const handleSubmit = (event) => {
    try {
      const sendData = { ...quizData, imageURL, category: categoryID, user: user.user._id };
      if (!sendData.title) {
        setNotifyText('Please fill in quiz title');
        return;
      }
      if (!sendData.category) {
        setNotifyText('Please select a category');
        return;
      }
      if (!sendData.visibility) {
        setNotifyText('Please select visibility mode');
        return;
      }
      dispatch();
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <Box>
        <Box
          component={Paper}
          sx={{
            padding: 3,
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '70vw',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <UploadImage
                userID={user.user._id}
                username={user.user.username}
                type="quiz"
                getData={getImageURL}
                height="15vw"
              />
            </Grid>
            <Grid item xs={1} sx={{ display: ' flex', justifyContent: 'center' }}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={7}>
              {/* <Divider orientation="vertical" /> */}
              <Typography>
                Quiz title <span style={{ color: '#E25B45' }}>*</span>
              </Typography>
              <TextField
                required
                size="small"
                fullWidth
                margin="normal"
                type={'text'}
                placeholder="Quiz title"
                variant="standard"
                name="title"
                onChange={handleChangeInput}
              ></TextField>
              <Typography>Description</Typography>
              <TextField
                size="small"
                fullWidth
                margin="normal"
                type={'text'}
                placeholder="Description"
                variant="standard"
                name="description"
                onChange={handleChangeInput}
              ></TextField>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography>
                    Visibility <span style={{ color: '#E25B45' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <FormControl sx={{ width: '100%' }} size="small">
                    <InputLabel></InputLabel>
                    <Select
                      sx={{ width: '100%' }}
                      labelId="visibility-select"
                      id="visibility-select"
                      size="small"
                      name="visibility"
                      onChange={handleChangeInput}
                    >
                      {Object.values(QUIZ_VISIBILITY).map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    Category <span style={{ color: '#E25B45' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <CategorySelect getData={getCategory} />
                </Grid>
              </Grid>
              {/* <Grid container> */}
              <Divider sx={{ marginY: 2 }} />
              <Typography color="error">{notifyText}</Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  marginY: 3,
                }}
              >
                <Button variant="contained" endIcon={<Save />} onClick={handleSubmit}>
                  Save
                </Button>
                <Button variant="outlined" endIcon={<ArrowBack />}>
                  Cancel
                </Button>
              </Box>
              {/* </Grid> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default UpdateQuiz;
