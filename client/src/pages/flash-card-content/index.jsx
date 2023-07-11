import { ListAlt } from '@mui/icons-material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, Button, Grid, Typography, IconButton } from '@mui/material';
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

  const [flipped, setFlipped] = useState(false);
  const [open, setOpen] = useState(false);
  const [flashcard, setFlashcard] = useState({});
  const [cardContentList, setCardContentList] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);

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
  useEffect(() => {
    if (flashcard.questions) {
      setCurrentCardIndex(0);
      setCardContentList(flashcard.questions);
    }
    // setCurrentCard(flashcard?.questions[0]);
  }, [flashcard]);
  useEffect(() => {
    setCurrentCard(cardContentList[currentCardIndex]);
    console.log('setCurrentCard');
  }, [currentCardIndex]);

  const handleToPrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };
  const handleToNext = () => {
    if (currentCardIndex < cardContentList.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };
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
                  <Typography variant="h6">{currentCard?.question}</Typography>
                  {console.log('currentCard?.answerOptions?.map', currentCard?.answerOptions)}
                  {currentCard?.answerOptions?.map((answer, index) => (
                    <Typography variant="h6" key={index}>
                      {index + 1}. {answer.answer}
                    </Typography>
                  ))}
                </div>
                <div className="card__face--footer">
                  <Typography style={{ color: '#00B8F1' }} variant="subtitle1">
                    Click the card to flip
                  </Typography>
                </div>
              </div>
              <div className="card__face card__face--back">
                <div className="card__face card__face--front">
                  <div className="card__face--content">
                    {currentCard?.answerOptions?.map((answer, index) => {
                      if (answer.isCorrect) {
                        return (
                          <Typography variant="h4" sx={{ textAlign: 'center' }}>
                            {index + 1}. {answer.answer}
                          </Typography>
                        );
                      } else return;
                    })}
                    {console.log('currentCard?.answerOptions)', currentCard?.answerOptions)}
                    {/* {getCorrectAnswer(currentCard?.answerOptions)} */}
                  </div>
                  <div className="card__face--footer">
                    {currentCard?.explaination && (
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
            <IconButton className="next__card-icon" onClick={handleToPrevious}>
              <ArrowBackIos />
            </IconButton>
            <Typography className="next__card-text" variant="h5">
              {currentCardIndex + 1} / {cardContentList?.length}
            </Typography>
            <IconButton className="next__card-icon" onClick={handleToNext}>
              <ArrowForwardIos />
            </IconButton>
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
