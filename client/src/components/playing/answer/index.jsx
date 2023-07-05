import React, { useState } from 'react';
import './Answer.scss';
import { Square, Circle, Star, Favorite } from '@mui/icons-material';
import { PLAYING_PROGRESS, ROLE } from '../../../utils/constants';
import { Button, Typography } from '@mui/material';
import { socket } from '../../../socketClient';

export const answerIcon = [
  <Square color="primary" sx={{ fontSize: '32px' }} />,
  <Circle color="primary" sx={{ fontSize: '32px' }} />,
  <Star color="primary" sx={{ fontSize: '32px' }} />,
  <Favorite color="primary" sx={{ fontSize: '32px' }} />,
];

const Answer = ({ question, progress, role, player, time, roomId }) => {
  console.log('roomId in answer', roomId);
  const answers = question.answerOptions;
  const [disable, setDisable] = useState(false);
  const handleClick = (e) => {
    if (role === ROLE.PLAYER) {
      const valueSelected = e.target.value;
      let answerSelected = answers.find((option) => option.answer === valueSelected);
      answerSelected = { ...answerSelected, isSelected: true };
      const data = {
        answerSelected,
        playerId: player?._id,
        timeToAnswer: new Date(Date.now()),
        maxTime: time,
        roomId: roomId,
      };
      socket.emit('Player_selected_answer', data);
      console.log('answer selected', data);
      setDisable(true);
    }
  };
  return (
    <div className="answer">
      <div className="header"></div>
      <div className="answer-inner">
        {answers.map((answer, index) => {
          const isInCorrect = progress === PLAYING_PROGRESS.SHOW_RESULT && !answer.isCorrect && answer.isSelected;
          const isCorrect = progress === PLAYING_PROGRESS.SHOW_RESULT && answer.isCorrect && answer.isSelected;
          const customClass = `${disable && 'disable'} ${isInCorrect && 'in-correct'} ${isCorrect && 'correct'} `;
          return (
            <div className="answer" key={index}>
              <Button
                className={`answer-item ${customClass}`}
                value={answer.answer}
                disabled={disable}
                onClick={handleClick}
              >
                <div className="answer-icon">{answerIcon[index]}</div>
                <div className="answer-text">{answer.answer}</div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Answer;
