import React, { forwardRef, useEffect, useState } from 'react';
import './ButtonControl.scss';
import Button from '@mui/material/Button';
import { PLAYING_PROGRESS, ROLE } from '../../../utils/constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DoneOutline, ExitToApp, ListAlt, Lock, NotStarted, SkipNext } from '@mui/icons-material';
import { socket } from '../../../socketClient';
// import { PLAYING_PROGRESS, ROLE } from '../../../utils/contants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ButtonControl = ({ progress, role, roomId, question, result, startFunc, nextFunc }) => {
  console.log('button control', progress, role, roomId, question, result);
  const [open, setOpen] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStart = () => {
    startFunc();
  };

  const handleMoveToNextQuestion = () => {
    nextFunc();
  };

  const handleFinish = () => {
    socket.emit('Show_result', { progress: PLAYING_PROGRESS.SHOW_RESULT, roomId: roomId });
  };

  useEffect(() => {
    if (progress === PLAYING_PROGRESS.SHOW_RESULT) {
      setPlayerScore(result.totalScore);
    }
  }, [result, progress]);

  if (progress === PLAYING_PROGRESS.WAITING_PLAYER)
    return (
      <div className="buttons-control">
        <div className="buttons-control-left">
          <Button variant="contained" endIcon={<ExitToApp />}>
            EXIT
          </Button>
        </div>
        <div className="buttons-control-right">
          <Button variant="contained" className="lock-btn">
            <Lock />
          </Button>
          <Button variant="contained" endIcon={<NotStarted />} onClick={handleStart}>
            START
          </Button>
        </div>
      </div>
    );

  if (role === ROLE.PLAYER)
    return (
      <div className="buttons-control">
        <div className="buttons-control-right">
          <Button variant="contained">Your score: {playerScore || 0}</Button>
        </div>
      </div>
    );

  if (progress === PLAYING_PROGRESS.ANSWER_TIME)
    return (
      <div className="buttons-control">
        <div className="buttons-control-left"></div>
        <div className="buttons-control-right">
          <Button variant="contained" endIcon={<DoneOutline />} onClick={handleFinish}>
            FINISH
          </Button>
        </div>
      </div>
    );

  if (progress === PLAYING_PROGRESS.SHOW_RESULT)
    return (
      <div className="buttons-control">
        <div className="buttons-control-left">
          {question.explaination && (
            <Button variant="contained" endIcon={<ListAlt />} onClick={handleClickOpen}>
              SHOW EXPLAINATION
            </Button>
          )}
        </div>
        <div className="buttons-control-right">
          <Button variant="contained" endIcon={<SkipNext />} onClick={handleMoveToNextQuestion}>
            NEXT
          </Button>
        </div>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Explaination'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{question?.explaination}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

export default ButtonControl;
