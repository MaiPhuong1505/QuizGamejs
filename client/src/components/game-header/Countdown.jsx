import { Box } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import './GameHeader.scss';
import { socket } from '../../socketClient';
import { PLAYING_PROGRESS, ROLE } from '../../utils/constants';

const Countdown = (props) => {
  const { time, isPlaying } = props;
  // const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    let intervalId;
    if (time) {
      setSeconds(time);
    }

    if (isPlaying && time) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            socket.emit('Show_result', PLAYING_PROGRESS.SHOW_RESULT);
            clearInterval(intervalId);
            return prevSeconds;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [time, isPlaying]);

  return (
    <Box className="time">
      {/* <div className="time"> */}
      {isPlaying && <div className="time-count"> {seconds < 10 ? `0${seconds}` : seconds}</div>}
      {/* </div> */}
    </Box>
  );
};

export default Countdown;
