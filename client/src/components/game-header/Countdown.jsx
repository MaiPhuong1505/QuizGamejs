import { Box } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';

const Timer = (props) => {
  const { time } = props;
  // const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds] = useState(time);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <Box>
      {/* { minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        } */}
      {seconds < 10 ? `0${seconds}` : seconds}
    </Box>
  );
};

export default Timer;
