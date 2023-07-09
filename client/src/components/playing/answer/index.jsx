import React, { useEffect, useState } from 'react';
import './Answer.scss';
import { Square, Circle, Star, Favorite, CheckCircleOutline, Cancel } from '@mui/icons-material';
import { PLAYING_PROGRESS, ROLE } from '../../../utils/constants';
import { Button, Grid, Typography } from '@mui/material';
import { socket } from '../../../socketClient';

export const answerIcon = [
  <Square color="primary" sx={{ fontSize: '32px' }} />,
  <Circle color="primary" sx={{ fontSize: '32px' }} />,
  <Star color="primary" sx={{ fontSize: '32px' }} />,
  <Favorite color="primary" sx={{ fontSize: '32px' }} />,
];

const Answer = ({ question, progress, role, player, time, roomId, result }) => {
  // let answers = question.answerOptions;
  const [answers, setAnswers] = useState([]);
  console.log('result in answer component', result);
  const [disable, setDisable] = useState(false);
  let customClass;
  const handleClick = (clickOnAnswer) => (e) => {
    console.log('answer in click', clickOnAnswer);
    if (role === ROLE.PLAYER) {
      const valueSelected = clickOnAnswer;
      console.log('valueSelected in click answer', valueSelected);
      let answerSelected = answers.find((option) => option.answer === valueSelected);
      console.log('answerSelected in click answer', answerSelected);

      answerSelected = { ...answerSelected, isSelected: true };
      const data = {
        answerSelected,
        playerId: player?._id,
        timeToAnswer: new Date(Date.now()),
        maxTime: time,
        roomId: roomId,
      };
      console.log('data in click answer', data);

      socket.emit('Player_selected_answer', data);
      console.log('answer selected', data);
      setDisable(true);
    }
  };
  const getIconResult = (answer) => {
    if (progress === PLAYING_PROGRESS.SHOW_RESULT) {
      if (answer.isCorrect) {
        return (
          <div className="answer-icon">
            <CheckCircleOutline color="#77dd76" />
          </div>
        );
      } else if (answer.isSelected && !answer.isCorrect) {
        return (
          <div className="answer-icon">
            <Cancel color="#ff6962" />
          </div>
        );
      }
    }
    return '';
  };
  useEffect(() => {
    setAnswers(question.answerOptions);
  }, [question]);
  useEffect(() => {
    if (progress === PLAYING_PROGRESS.ANSWER_TIME) {
      setDisable(false);
    }
  }, [progress]);
  useEffect(() => {
    if (Object.keys(result).length > 0) {
      const receiveAnswers = question.answerOptions.map((option) => {
        if (option.answer === result?.answerSelected?.answer) {
          option = { ...option, isSelected: true };
          return option;
        }
        return option;
      });
      setAnswers(receiveAnswers);
      console.log('answers in answers component', answers);
    }
  }, [progress, result]);
  return (
    <div className="answer">
      <div className="header"></div>
      <Grid container className="answer-inner" spacing={2}>
        {answers.map((answer, index) => {
          if (answer.isSelected === undefined) {
            console.log('answer.isCorrect', answer.isCorrect);
            const isCorrect = progress === PLAYING_PROGRESS.SHOW_RESULT && answer.isCorrect;
            customClass = `${disable && 'disable'} ${isCorrect && 'correct'} `;
          } else {
            const isInCorrect = progress === PLAYING_PROGRESS.SHOW_RESULT && !answer.isCorrect && answer.isSelected;
            console.log('answer in map answer/index.jsx', answer);
            const isCorrect = progress === PLAYING_PROGRESS.SHOW_RESULT && answer.isCorrect;
            customClass = `${disable && 'disable'} ${isInCorrect && 'in-correct'} ${isCorrect && 'correct'} `;
          }
          return (
            <Grid item xs={12} sm={6} className="answer" key={index}>
              <Button className={`answer-item ${customClass}`} disabled={disable} onClick={handleClick(answer.answer)}>
                <div className="answer-icon">{answerIcon[index]}</div>
                <div className="answer-text">{answer.answer}</div>
                {getIconResult(answer)}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Answer;
