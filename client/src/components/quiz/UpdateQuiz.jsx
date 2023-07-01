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
import { quizServices } from '../../services/quizServices';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  console.log('user in create quiz', user);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [notifyText, setNotifyText] = useState('');
  // const [selectedVisibility, setSelectedVisibility] = useState(QUIZ_VISIBILITY.PUBLIC)

  const handleChangeInputDescription = (e) => {
    if (notifyText) {
      setNotifyText('');
    }
    const { name, value } = e.target;
    setDescription(value);
  };
  const handleChangeInputTitle = (e) => {
    if (notifyText) {
      setNotifyText('');
    }
    const { name, value } = e.target;
    setTitle(value);
  };
  const handleChangeInputVisibility = (e) => {
    if (notifyText) {
      setNotifyText('');
    }
    const { name, value } = e.target;
    setVisibility(value);
  };
  const getCategory = (categoryId) => {
    setCategoryID(categoryId);
  };
  const getImageURL = (url) => {
    setImageURL(url);
  };


  useEffect(() => {
    try {
      quizServices.getQuizById(id, user?.token).then((response) => {
        console.log(response);
        setTitle(response?.data?.quiz?.title);
        setDescription(response?.data?.quiz?.description);
        setImageURL(response?.data?.quiz?.imageURL);
        setVisibility(response?.data?.quiz?.visibility);
        setCategoryID(response?.data?.quiz?.category);
      });
    } catch (error) {
      console.log('error', error);
      navigate('/404');
    }
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {

    try {
      //validate
      if (!title) {
        setNotifyText('Please fill in quiz title');
        return;
      }
      if (!categoryID) {
        setNotifyText('Please select a category');
        return;
      }
      if (!visibility) {
        setNotifyText('Please select visibility mode');
        return;
      }

      //call api to save
      const response = await quizServices.createQuiz({
        title: title,
        category: categoryID,
        description: description,
        visibility: visibility,
        imageURL: imageURL,
        user: user.user._id
      },user?.token);
      console.log(response);

      //redirect
      navigate(`/quiz/${response?.data?.newQuiz?.quizId}`);
    } catch (error) {
      console.log('error', error);
      navigate('/404');    
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
                value={title}
                onChange={handleChangeInputTitle}
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
                value={description}
                onChange={handleChangeInputDescription}
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
                      value={visibility}
                      onChange={handleChangeInputVisibility}
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
                  <CategorySelect getData={getCategory} categoryId={categoryID} />
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
                <Button variant="outlined" endIcon={<ArrowBack />} onClick={handleCancel}>
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
