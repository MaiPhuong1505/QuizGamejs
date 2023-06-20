import React from 'react';
import './Answer.scss';
import { Square, Circle, Star, Favorite } from '@mui/icons-material';

export const answerIcon = {
  SQUARE: <Square />,
  CIRCLE: <Circle />,
  STAR: <Star />,
  HEART: <Favorite />,
};

const Answer = ({ answers }) => {
  return (
    <div className="answer">
      <div className="header"></div>
      <div className="answer-inner">
        {answers.map((answer) => {
          const isInCorrect = !answer.isCorrect && answer.isSelected;
          const customClass = `${answer.disable && 'disable'} ${isInCorrect && 'in-correct'} ${
            answer.isCorrect && 'correct'
          } `;
          return (
            <div className="answer" key={answer.type}>
              <div className={`answer-item ${customClass}`}>
                <div className="answer-icon">{answerIcon[answer.type]}</div>
                <div className="answer-text">Lorem ipsum dolor sit amet.</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Answer;
