import { Box } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import './GameHeader.scss';

const Countdown = (props) => {
  const { time, isPlaying } = props;
  // const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds] = useState(time);
  console.log('isPlaying', isPlaying);
  console.log('time', time, seconds);
  // useEffect(() => {
  //   if (!time) return;
  //   // setSeconds(time);
  //   let myInterval = setInterval(() => {
  //     console.log(seconds);
  //     if (seconds > 0) {
  //       setSeconds((pre) => pre - 1);
  //     }
  //     if (seconds === 0 || seconds === undefined) {
  //       console.log('second 0', seconds);
  //       clearInterval(myInterval);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // });
  useEffect(() => {
    let intervalId;
    if (time) {
      setSeconds(time);
    }

    if (isPlaying && time) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
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
