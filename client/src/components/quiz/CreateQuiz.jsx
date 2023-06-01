import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Divider, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material';
import CategorySelect from './CategorySelect';
const CreateQuiz = () => {
  const [categoryID, setCategoryID] = useState('');
  const [quizData, setQuizData] = useState({});

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };
  const handleSubmit = () => {};
  const getCategory = (categoryId) => {
    setCategoryID(categoryId);
  };
  return (
    <>
      <Box
        component={Paper}
        sx={{ padding: 3, magin: 5, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      >
        {/* <UploadImage OwnerID={ownerId} fileName={name} getData={getImageURL} height='10vw' width='10vw' /> */}

        <Divider sx={{ marginY: 2 }} />
        <Typography>
          Quiz title <span style={{ color: '#E25B45' }}>*</span>
        </Typography>
        <TextField
          size="small"
          fullWidth
          margin="dense"
          type={'text'}
          placeholder="Quiz title"
          variant="standard"
          name="title"
          onChange={handleChangeInput}
        ></TextField>
        <Typography>
          Description <span style={{ color: '#E25B45' }}>*</span>
        </Typography>
        <TextField
          size="small"
          fullWidth
          margin="dense"
          type={'text'}
          placeholder="Description"
          variant="standard"
          name="description"
          onChange={handleChangeInput}
        ></TextField>
        <Typography>
          Visibility <span style={{ color: '#E25B45' }}>*</span>
        </Typography>
        <TextField
          size="small"
          fullWidth
          margin="dense"
          type={'text'}
          placeholder="Visibility"
          variant="standard"
          name="visibility"
          onChange={handleChangeInput}
        ></TextField>
        <Typography>
          Category <span style={{ color: '#E25B45' }}>*</span>
        </Typography>
        <CategorySelect getData={getCategory} />
        <Divider sx={{ marginY: 2 }} />
        {/* <Grid container spacing={2}>
            <Grid item xs={5}
                sx={{
                    display: 'flex',
                    flexFlow: 'wrap',
                    alignContent: 'center',
                }}>
                <SellIcon sx={{ color: '#89D5C9' }}></SellIcon>
                <Typography sx={{ ml: 1 }}>
                    Giá <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <TextField
                    size='small' fullWidth margin="dense" type={'text'}
                    variant="standard"
                    onChange={(e) => setPrice(e.target.value)}>
                </TextField>
            </Grid>
            <Grid item xs={5}
                sx={{
                    display: 'flex',
                    flexFlow: 'wrap',
                    alignContent: 'center',
                }}>
                <ListIcon sx={{ color: '#89D5C9' }}></ListIcon>
                <Typography sx={{ ml: 1 }}>
                    Danh mục <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
            </Grid>
            <Grid item xs={7}
                sx={{
                    display: 'flex',
                    flexFlow: 'wrap',
                    alignContent: 'center',
                }}>
                
            </Grid>
            <Grid item xs={5}
                sx={{
                    display: 'flex',
                    flexFlow: 'wrap',
                    alignContent: 'center',
                }}>
                <GrainIcon sx={{ color: '#89D5C9' }}></GrainIcon>
                <Typography sx={{ ml: 1 }}>
                    Topping <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <ToppingFood getData={getToppingSelected} />
            </Grid>
            <Grid item xs={5}
                sx={{
                    display: 'flex',
                    flexFlow: 'wrap',
                    alignContent: 'center',
                }}>
                <InventoryIcon sx={{ color: '#89D5C9' }}></InventoryIcon>
                <Typography sx={{ ml: 1 }}>
                    Trạng thái <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
            </Grid>
            <Grid item xs={7}
                sx={{
                    display: 'flex',
                    flexFlow: 'wrap',
                    alignItems: 'center',
                }}>
                <Typography>
                    Còn hàng
                </Typography>
                <Checkbox defaultChecked onChange={(e) => setStatus(e.target.checked)}></Checkbox>
            </Grid>
        </Grid> */}
      </Box>
    </>
  );
};

export default CreateQuiz;
