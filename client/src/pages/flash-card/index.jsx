import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { quizServices } from '../../services/quizServices';
import { useSelector } from 'react-redux';
import { Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FlashCard = () => {
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const [flashcardList, setFlashcardList] = useState([]);

  const handleViewContent = (flashcardId) => {
    navigate(`/flashcardContent/${flashcardId}`);
  };
  useEffect(() => {
    const getFlashcardList = async () => {
      try {
        if (user?.user?._id) {
          const response = await quizServices.getAllFlashcards(user?.user?._id, user?.token);
          if (response?.data) {
            setFlashcardList(response?.data?.flashcards);
            console.log('response?.data?.flashcards', response?.data?.flashcards);
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    if (sessionStorage.getItem('flashcardData')) {
      sessionStorage.removeItem('flashcardData');
    }
    getFlashcardList();
  }, []);
  // const flashcardList = [
  //   {
  //     _id: 1,
  //     title: 'Flascard Title',
  //     description: 'Math',
  //     item: '10 items',
  //   },
  //   {
  //     _id: 2,
  //     title: 'Flascard Title',
  //     description: 'Math',
  //     item: '10 items',
  //   },
  //   {
  //     _id: 3,
  //     title: 'Flascard Title',
  //     description: 'Math',
  //     item: '10 items',
  //   },
  //   {
  //     _id: 4,
  //     title: 'Flascard Title',
  //     description: 'Math',
  //     item: '10 items',
  //   },
  //   {
  //     _id: 5,
  //     title: 'Flascard Title',
  //     description: 'Math',
  //     item: '10 items',
  //   },
  // ];
  return (
    <>
      <Box
        sx={{
          padding: '60px 80px',
        }}
      >
        <Typography paddingBottom={'30px'}>You have {flashcardList?.length} flashcard</Typography>
        <Grid container spacing={5} rowSpacing={4}>
          {flashcardList?.map((flashCard) => (
            <Grid key={flashCard._id} item md={6}>
              <Card sx={{ padding: '25px', borderRadius: '12px' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <Typography sx={{ fontWeight: '700', fontSize: '22px' }}>{flashCard.title} </Typography>
                  <Typography>{flashCard.description}</Typography>
                  <Typography>{flashCard.questions.length} items</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <Button variant="contained" endIcon={<Visibility />} onClick={() => handleViewContent(flashCard._id)}>
                    View
                  </Button>
                  <Button variant="outlined" endIcon={<Delete />} color="error">
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default FlashCard;
