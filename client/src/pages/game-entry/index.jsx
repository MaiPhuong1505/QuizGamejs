import React, { useState } from 'react';
import './GameEntry.scss';
import { Button, TextField, Typography } from '@mui/material';
import { socket } from '../../socketClient';

const GameEntry = () => {
  const enterCodeText = {
    ENTER_PIN: 'ENTER YOUR PIN',
    ENTER_NAME: 'ENTER YOUR NAME',
  };
  const [codeValue, setCodeValue] = useState('');
  const [buttonText, setButtonText] = useState(enterCodeText.ENTER_PIN);

  const handleEnterCode = () => {
    socket.connect();
    if (buttonText === enterCodeText.ENTER_PIN) {
      socket.emit('Player_send_PIN_code', codeValue);
      // socket.on('client send msg', (msg) => {
      //   setHi(msg);
      // });
    }
  };

  return (
    <div className="enter-code-wrapper">
      <div className="enter-code">
        <TextField
          onChange={(e) => {
            setCodeValue(e?.target?.value || '');
          }}
          variant="outlined"
          value={codeValue}
        />
        <Button className="enter-code-btn" variant="contained" onClick={handleEnterCode}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default GameEntry;
