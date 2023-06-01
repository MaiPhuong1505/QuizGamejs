import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { RadioButtonUnchecked } from '@mui/icons-material';
const CreateQuestion = () => {
  return (
    <>
      <Box
        component={Paper}
        sx={{ padding: 3, marginX: 5, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      >
        {/* <UploadImage OwnerID={ownerId} fileName={name} getData={getImageURL} height='10vw' width='10vw' /> */}

        <Divider sx={{ marginY: 2 }} />
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
        <Select label={'Time'}>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={45}>45</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
        <Typography>
          Difficulty<span style={{ color: '#E25B45' }}>*</span>
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          type={'text'}
          placeholder="Difficulty"
          variant="standard"
          name="difficulty"
          // onChange={handleChangeInput}
        ></TextField>
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
            <IconButton>
              <RadioButtonUnchecked />
            </IconButton>
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
      </Box>
    </>
  );
};

export default CreateQuestion;
