import React from 'react';
import './QuestionInGame.scss';
import { ANSWER_TYPE, PLAYING_PROGRESS, ROLE } from '../../../utils/constants';
import { answerIcon } from '../answer';
// import { PLAYING_PROGRESS, ROLE } from '../../../utils/contants';

const QuestionInGame = ({ progress, role, answersChart }) => {
  const isCorrect = false;

  const isAnswerTime = progress === PLAYING_PROGRESS.ANSWER_TIME;
  const isAdminResult = progress === PLAYING_PROGRESS.SHOW_RESULT && role === ROLE.ADMIN;
  const isPlayerResult = progress === PLAYING_PROGRESS.SHOW_RESULT && role === ROLE.PLAYER;

  return (
    <div className="question-wrapper">
      <div className="header"></div>
      <div className="question-inner">
        <div className="question">Lorem ipsum dolor sit amet</div>
        <div className="info">
          {isAnswerTime && <div className="info-image">show image</div>}

          {isAdminResult && (
            <div className="info-chart">
              {answersChart.map((answer) => {
                return (
                  <div className="info-chart-item" key={answer.type}>
                    <div className="info-chart-percent">
                      <div className="current-percent" style={{ height: answer.percent }}></div>
                    </div>
                    <div className="info-chart-title">
                      {answerIcon[answer.type]} {answer.count}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {isPlayerResult && (
            <>
              {isCorrect ? (
                <div className="info-point corect">+852 points</div>
              ) : (
                <div className="info-point incorrect">Incorrect</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionInGame;
