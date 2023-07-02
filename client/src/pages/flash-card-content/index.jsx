import { ListAlt } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Grid, Typography } from '@mui/material';
import { default as React } from 'react';
import './style.scss';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FlashCardContent = () => {
  const [flipped, setFlipped] = React.useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.stopPropagation();

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className="flash-card-content">
        <div className="header">QuizGame</div>
        <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: 'center' }}>
          Flashcard title
        </Typography>
        <Typography style={{ textAlign: 'center' }} variant="h5">
          Description
        </Typography>
        <Grid container className="flash-card-inner">
          <div class="scene scene--card" onClick={handleClick}>
            <div class={`card ${flipped ? 'is-flipped' : ''}`}>
              <div class="card__face card__face--front">
                <div className="card__face--content">Flashcard content (front)</div>
                <div className="card__face--footer">
                  <Typography style={{ color: '#00B8F1' }} variant="h5">
                    Click the card to flip
                  </Typography>
                </div>
              </div>
              <div class="card__face card__face--back">
                <div class="card__face card__face--front">
                  <div className="card__face--content">Flashcard content (behind)</div>
                  <div className="card__face--footer">
                    <Button
                      variant="contained"
                      className="card__face--btn"
                      endIcon={<ListAlt />}
                      onClick={handleClickOpen}
                    >
                      SHOW EXPLAINATION
                    </Button>
                    <Typography style={{ color: '#00B8F1' }} variant="h5">
                      Click the card to flip
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="next__card">
          <Grid className="next__card-inner">
            <ArrowBackIosIcon className="next__card-icon" />
            <Typography className="next__card-text" variant="h5">
              01 / 10
            </Typography>
            <ArrowForwardIosIcon className="next__card-icon" />
          </Grid>
        </Grid>
      </Box>

      <Dialog open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Explaination</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, sint rerum dicta tenetur iste ullam
            qui officia, ipsa doloribus eius maxime pariatur mollitia omnis, quis odio! Saepe quis cupiditate provident!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FlashCardContent;
