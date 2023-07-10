import { ListAlt } from '@mui/icons-material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { default as React, useEffect, useState } from 'react';
import './style.scss';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router';
import { quizServices } from '../../services/quizServices';
import { useSelector } from 'react-redux';

const FlashCardContent = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state);

  const [flipped, setFlipped] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [flashcard, setFlashcard] = useState({});
  const [currentCard, setCurrentCard] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getFlashcardContent = async () => {
      try {
        const response = await quizServices.getFlashcardById(id, user?.token);
        if (response?.data) {
          setFlashcard(response?.data?.flashcard);
          setCurrentCardIndex(0);
          setCurrentCard(response?.data?.flashcard?.question[0]);
          console.log('response?.data?.flashcard', response?.data?.flashcard);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getFlashcardContent();
    }
  }, []);
  return (
    <>
      <Box className="flash-card-content">
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginTop: '20px' }}>
          {flashcard.title}
        </Typography>
        <Typography style={{ textAlign: 'center' }} variant="h6">
          {flashcard.description}
        </Typography>
        <Grid container className="flash-card-inner">
          <div className="scene scene--card" onClick={handleClick}>
            <div className={`card ${flipped ? 'is-flipped' : ''}`}>
              <div className="card__face card__face--front">
                <div className="card__face--content">
                  {currentCard.question}
                  {currentCard?.answerOptions?.map((answer, index) => (
                    <Typography>
                      {index + 1}. {answer.answer}
                    </Typography>
                  ))}
                </div>
                <div className="card__face--footer">
                  <Typography style={{ color: '#00B8F1' }} variant="h5">
                    Click the card to flip
                  </Typography>
                </div>
              </div>
              <div className="card__face card__face--back">
                <div className="card__face card__face--front">
                  <div className="card__face--content">
                    {currentCard?.answerOptions?.map((answer, index) => {
                      if (answer.isCorrect)
                        return (
                          <Typography>
                            {index + 1}. {answer.answer}
                          </Typography>
                        );
                    })}
                  </div>
                  <div className="card__face--footer">
                    {currentCard.explaination && (
                      <Button
                        variant="contained"
                        className="card__face--btn"
                        endIcon={<ListAlt />}
                        onClick={handleClickOpen}
                      >
                        SHOW EXPLAINATION
                      </Button>
                    )}
                    <Typography style={{ color: '#00B8F1' }} variant="subtitle2">
                      Click the card to flip
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        ;
        <Grid className="next__card">
          <Grid className="next__card-inner">
            <ArrowBackIos className="next__card-icon" />
            <Typography className="next__card-text" variant="h5">
              {currentCardIndex + 1} / {flashcard.questions.length}
            </Typography>
            <ArrowForwardIos className="next__card-icon" />
          </Grid>
        </Grid>
        ;
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
