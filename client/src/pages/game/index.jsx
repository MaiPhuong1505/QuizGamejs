import { Typography, Button, Box, Grid, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();
  const result = () => {
    navigate('/result');
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'space-between',
            padding: 3,
            boxSizing: 'border-box',
            borderBottom: '1px solid gray',
          }}
        >
          <Typography>Game code: 7767676</Typography>
          <Typography
            sx={{
              border: '1px solid lightskyblue',
              padding: 1,
              boxSizing: 'border-box',
              backgroundColor: 'lightskyblue',
            }}
          >
            Time:{' '}
          </Typography>
        </Box>
        <Box sx={{ marginX: 15, marginY: 5, display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" onClick={result}>
            Next
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginY: 10, marginX: 15 }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Question content
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  width: '100%',
                  border: '3px solid lightskyblue',
                  padding: 2,
                  boxSizing: 'border-box',
                  backgroundColor: '#d5efff',
                  borderRadius: '8px',
                }}
              >
                Option A
              </Typography>
              {/* <IconButton>
                <RadioButtonUnchecked />
              </IconButton> */}
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  width: '100%',
                  border: '3px solid lightskyblue',
                  padding: 2,
                  boxSizing: 'border-box',
                  backgroundColor: '#d5efff',
                  borderRadius: '8px',
                }}
              >
                Option A
              </Typography>
              {/* <IconButton>
                <RadioButtonUnchecked />
              </IconButton> */}
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  width: '100%',
                  border: '3px solid lightskyblue',
                  padding: 2,
                  boxSizing: 'border-box',
                  backgroundColor: '#d5efff',
                  borderRadius: '8px',
                }}
              >
                Option A
              </Typography>
              {/* <IconButton>
                <RadioButtonUnchecked />
              </IconButton> */}
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  width: '100%',
                  border: '3px solid lightskyblue',
                  padding: 2,
                  boxSizing: 'border-box',
                  backgroundColor: '#d5efff',
                  borderRadius: '8px',
                }}
              >
                Option A
              </Typography>
              {/* <IconButton>
                <RadioButtonUnchecked />
              </IconButton> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Game;
