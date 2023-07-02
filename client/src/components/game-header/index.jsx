import React, { useEffect, useState } from 'react';
import { AppBar, Typography } from '@mui/material';
import './GameHeader.scss';
import { PLAYING_PROGRESS } from '../../utils/constants';
import { socket } from '../../socketClient';
const GameHeader = ({ progress, pinCode, quiz, time, currentIndex }) => {
  const isPlaying = progress === PLAYING_PROGRESS.ANSWER_TIME;

  return (
    <AppBar position="fixed" className="game-header">
      <div className="container">
        {/* <div className="question">{isHidden && 'Question: 1/10'}</div> */}
        <Typography className="question">
          {isPlaying && `Question: ${currentIndex + 1}/${quiz.questions.length}`}
        </Typography>
        <Typography className="title">
          {isPlaying ? `${quiz.title}` : `Welcome, your room code is: ${pinCode}`}
        </Typography>
        <div className="time">{isPlaying && <div className="time-count">{time}</div>}</div>
      </div>
    </AppBar>
  );
};

export default GameHeader;
