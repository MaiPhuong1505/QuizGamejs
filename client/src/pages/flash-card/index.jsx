import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';

const FlashCard = () => {
  useEffect(() => {
    if (sessionStorage.getItem('flashcardData')) {
      sessionStorage.removeItem('flashcardData');
    }
  }, []);
  const flashCards = [
    {
      _id: 1,
      title: 'Flascard Title',
      description: 'Math',
      item: '10 items',
    },
    {
      _id: 2,
      title: 'Flascard Title',
      description: 'Math',
      item: '10 items',
    },
    {
      _id: 3,
      title: 'Flascard Title',
      description: 'Math',
      item: '10 items',
    },
    {
      _id: 4,
      title: 'Flascard Title',
      description: 'Math',
      item: '10 items',
    },
    {
      _id: 5,
      title: 'Flascard Title',
      description: 'Math',
      item: '10 items',
    },
  ];
  return (
    <>
      <Box
        sx={{
          padding: '60px 80px',
        }}
      >
        <Typography paddingBottom={'30px'}>You have 3 flashcard</Typography>
        <Grid container spacing={5} rowSpacing={4}>
          {flashCards?.map((flashCard) => (
            <Grid key={flashCard._id} item md={6}>
              <Card sx={{ padding: '25px' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <Typography sx={{ fontWeight: '700', fontSize: '22px' }}>{flashCard.title} </Typography>
                  <Typography>{flashCard.description}</Typography>
                  <Typography>{flashCard.item}</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <Button sx={{ background: '#00B8F1', color: 'white' }}>View </Button>
                  <Button sx={{ border: '1px solid #D63E3E', color: '#D63E3E' }}>Delete</Button>
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
