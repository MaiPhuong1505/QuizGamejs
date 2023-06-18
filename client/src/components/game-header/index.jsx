import React from 'react';
import { AppBar, Typography } from '@mui/material';
import './GameHeader.scss';
import { PLAYING_PROGRESS } from '../../utils/constants';
const GameHeader = ({ progress }) => {
  const isHidden = progress !== PLAYING_PROGRESS.WAITING_PLAYER;
  return (
    <AppBar position="fixed" className="game-header">
      <div className="container">
        {/* <div className="question">{isHidden && 'Question: 1/10'}</div> */}
        <Typography className="question">{isHidden && 'Question: 1/10'}</Typography>
        <Typography className="title">Welcome, your ID room is: 787897</Typography>
        <div className="time">{isHidden && <div className="time-count">00:00</div>}</div>
      </div>
    </AppBar>
  );
};

export default GameHeader;
