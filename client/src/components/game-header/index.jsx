import React, { useEffect, useState } from 'react';
import { AppBar, Typography } from '@mui/material';
import './GameHeader.scss';
import { PLAYING_PROGRESS } from '../../utils/constants';
import { socket } from '../../socketClient';
import Countdown from './Countdown';
const GameHeader = ({ progress, pinCode, quiz, time, currentIndex }) => {
  const [gameHeaderProgress, setGameHeaderProgress] = useState(PLAYING_PROGRESS.WAITING_PLAYER);
  // const isPlaying = progress === PLAYING_PROGRESS.ANSWER_TIME;
  // const isWaiting = progress === PLAYING_PROGRESS.WAITING_PLAYER;
  // const isResultShowed = progress === PLAYING_PROGRESS.SHOW_RESULT;
  console.log('isPlaying in Gameheader', progress, quiz);
  useEffect(() => {
    setGameHeaderProgress(progress);
  }, [progress]);
  return (
    <AppBar position="fixed" className="game-header">
      <div className="container">
        {/* <div className="question">{isHidden && 'Question: 1/10'}</div> */}
        <Typography className="question">
          {(gameHeaderProgress === PLAYING_PROGRESS.ANSWER_TIME ||
            gameHeaderProgress === PLAYING_PROGRESS.SHOW_RESULT) &&
            `Question: ${currentIndex + 1}/${quiz?.questions?.length || 0}`}
        </Typography>
        <Typography className="title">
          {gameHeaderProgress === PLAYING_PROGRESS.WAITING_PLAYER
            ? `Welcome, your room code is: ${pinCode}`
            : `${quiz?.title}`}
        </Typography>
        <Countdown isPlaying={gameHeaderProgress === PLAYING_PROGRESS.ANSWER_TIME} time={time} />
      </div>
    </AppBar>
  );
};

export default GameHeader;
