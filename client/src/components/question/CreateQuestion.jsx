import React from 'react';
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
const CreateQuestion = () => {
  const handleSubmit = () => {};
  return (
    <>
      <Box
        component={Paper}
        sx={{
          padding: 3,
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          maxWidth: '80vw',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <UploadImage height="10vw" width="10vw" />
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
              name="title"
              // onChange={handleChangeInput}
            ></TextField>
            <FormControlLabel control={<Checkbox />} label="Multiple correct answers" />
            <Typography>
              Time (seconds) <span style={{ color: '#E25B45' }}>*</span>
            </Typography>
            <FormControl sx={{ marginBottom: '16px', width: '100%' }}>
              <InputLabel id="time"></InputLabel>
              <Select label="" size="small">
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={60}>60</MenuItem>
              </Select>
            </FormControl>
            <Typography>
              Difficulty<span style={{ color: '#E25B45' }}>*</span>
            </Typography>
            <FormControl sx={{ marginBottom: '16px', width: '100%' }}>
              <InputLabel id="time"></InputLabel>
              <Select label="" size="small">
                <MenuItem value={'Easy'}>Easy</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'Difficult'}>Difficult</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
              fullWidth
              margin="dense"
              type={'text'}
              placeholder="Difficulty"
              variant="standard"
              name="difficulty"
              // onChange={handleChangeInput}
            ></TextField> */}
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="dense"
                  type={'text'}
                  placeholder="Option A"
                  variant="outlined"
                  name="option1"
                />
                <IconButton>
                  <RadioButtonUnchecked />
                </IconButton>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="dense"
                  type={'text'}
                  placeholder="Option B"
                  variant="outlined"
                  name="option2"
                />
                <FormControlLabel value="" control={<Radio />} label="" />
                {/* <IconButton>
                  <RadioButtonUnchecked />
                </IconButton> */}
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="dense"
                  type={'text'}
                  placeholder="Option C"
                  variant="outlined"
                  name="option3"
                />
                <IconButton>
                  <RadioButtonUnchecked />
                </IconButton>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  margin="dense"
                  type={'text'}
                  placeholder="Option D"
                  variant="outlined"
                  name="option4"
                />
                <IconButton>
                  <RadioButtonUnchecked />
                </IconButton>
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

export default CreateQuestion;
