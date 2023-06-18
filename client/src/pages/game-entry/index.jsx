import React, { useState } from 'react';
import './GameEntry.scss';
import { Button, TextField } from '@mui/material';

const GameEntry = () => {
  const enterCodeProgress = 'ENTER_PIN';
  const [codeValue, setCodeValue] = useState('');
  const enterCodeText = {
    ENTER_PIN: 'ENTER YOUR PIN',
    ENTER_NAME: 'ENTER YOUR NAME',
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
        <Button className="enter-code-btn" variant="contained">
          {enterCodeText[enterCodeProgress]}
        </Button>
      </div>
    </div>
  );
};

export default GameEntry;
