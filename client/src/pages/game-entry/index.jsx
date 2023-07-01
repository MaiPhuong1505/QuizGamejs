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
  const [notifyText, setNotifyText] = useState('');
  const [gameHistoryId, setGameHistoryId] = useState('');
  // let gameHistoryId;
  const [buttonText, setButtonText] = useState(enterCodeText.ENTER_PIN);

  // socket.on('New_game', (newGameData) => {
  //   console.log('newGameData in game entry', newGameData);
  //   setGame(newGameData);
  // });
  const handleEnterCode = () => {
    socket.connect();
    console.log('setCodeValue', codeValue);
    if (buttonText === enterCodeText.ENTER_PIN) {
      // socket.emit('Get_PIN_code_from_server', {});
      socket.emit('Player_send_PIN_code', codeValue);
      socket.on('Player_send_PIN_code', (data) => {
        if (data.rightCode) {
          setCodeValue('');
          setGameHistoryId(data.roomId);
          setButtonText(enterCodeText.ENTER_NAME);
        } else {
          setNotifyText('Wrong code. Please enter again!');
        }
      });
    } else if (buttonText === enterCodeText.ENTER_NAME) {
      console.log('gameHistoryId in game entry', gameHistoryId);
      console.log(1);
      socket.emit('Player_join', { nickname: codeValue, gameHistoryId });
      socket.on('Join_response', (msg) => {
        setNotifyText(msg);
      });
      // socket.on('Get_game', (newGameData) => {
      //   console.log('Get_game', newGameData);
      //   const newPlayerInGame = { nickname: codeValue, gameHistoryId: newGameData. `?._id };
      //   socket.emit('Player_join', newPlayerInGame);
      // });
    }
  };

  return (
    <div className="enter-code-wrapper">
      <div className="enter-code">
        <TextField
          onChange={(e) => {
            if (notifyText) {
              setNotifyText('');
            }
            setCodeValue(e?.target?.value || '');
          }}
          variant="outlined"
          value={codeValue}
        />
        <Typography>{notifyText}</Typography>
        <Button className="enter-code-btn" variant="contained" onClick={handleEnterCode}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default GameEntry;
