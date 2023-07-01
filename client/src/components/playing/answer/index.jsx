import React from 'react';
import './Answer.scss';
import { Square, Circle, Star, Favorite } from '@mui/icons-material';

export const answerIcon = [
  <Square color="primary" />,
  <Circle color="primary" />,
  <Star color="maprimaryin" />,
  <Favorite color="primary" />,
];

const Answer = ({ answers }) => {
  return (
    <div className="answer">
      <div className="header"></div>
      <div className="answer-inner">
        {answers.map((answer, index) => {
          const isInCorrect = !answer.isCorrect && answer.isSelected;
          const customClass = `${answer.disable && 'disable'} ${isInCorrect && 'in-correct'} ${
            answer.isCorrect && 'correct'
          } `;
          return (
            <div className="answer" key={index}>
              <div className={`answer-item ${customClass}`}>
                <div className="answer-icon">{answerIcon[index]}</div>
                <div className="answer-text">{answer.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Answer;
