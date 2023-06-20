import React, { forwardRef, useState } from 'react';
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
// import { PLAYING_PROGRESS, ROLE } from '../../../utils/contants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ButtonControl = ({ progress, role }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Button variant="contained" endIcon={<NotStarted />}>
            START
          </Button>
        </div>
      </div>
    );

  if (role === ROLE.PLAYER)
    return (
      <div className="buttons-control">
        <div className="buttons-control-right">
          <Button variant="contained">Your score: 0</Button>
        </div>
      </div>
    );

  if (progress === PLAYING_PROGRESS.ANSWER_TIME)
    return (
      <div className="buttons-control">
        <div className="buttons-control-left"></div>
        <div className="buttons-control-right">
          <Button variant="contained" endIcon={<DoneOutline />}>
            FINISH
          </Button>
        </div>
      </div>
    );

  if (progress === PLAYING_PROGRESS.SHOW_RESULT)
    return (
      <div className="buttons-control">
        <div className="buttons-control-left">
          <Button variant="contained" endIcon={<ListAlt />} onClick={handleClickOpen}>
            SHOW EXPLAINATION
          </Button>
        </div>
        <div className="buttons-control-right">
          <Button variant="contained" endIcon={<SkipNext />}>
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
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to Google, even when
              no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

export default ButtonControl;
