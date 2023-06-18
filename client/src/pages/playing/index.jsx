import React from 'react';
import './Playing.scss';
import { ANSWER_TYPE, PLAYING_PROGRESS, ROLE } from '../../utils/constants';
import GameHeader from '../../components/game-header';
import ButtonControl from '../../components/playing/button-control';
import WaitingPlayer from '../../components/playing/waiting-player';
import QuestionInGame from '../../components/playing/question-in-game';
import Answer from '../../components/playing/answer';

const Playing = () => {
  const [progress, setProgress] = React.useState(PLAYING_PROGRESS.SHOW_RESULT);
  const [role, setRole] = React.useState(ROLE.ADMIN);
  const [answersChart, setAnswersChart] = React.useState([
    {
      percent: '60%',
      type: ANSWER_TYPE.SQUARE,
      count: '10',
    },
    {
      percent: '100%',
      type: ANSWER_TYPE.CIRCLE,
      count: '10',
    },
    {
      percent: '40%',
      type: ANSWER_TYPE.HEART,
      count: '10',
    },
    {
      percent: '40%',
      type: ANSWER_TYPE.STAR,
      count: '10',
    },
  ]);

  const [answers, setAnswers] = React.useState([
    {
      answer: 'Lorem ipsum dolor sit amet.',
      isSelected: false,
      isCorrect: true,
      type: ANSWER_TYPE.SQUARE,
      disable: false,
    },
    {
      answer: 'Lorem ipsum dolor sit amet.',
      isSelected: false,
      isCorrect: false,
      type: ANSWER_TYPE.CIRCLE,
      disable: false,
    },
    {
      answer: 'Lorem ipsum dolor sit amet.',
      isSelected: false,
      isCorrect: false,
      type: ANSWER_TYPE.HEART,
      disable: false,
    },
    {
      answer: 'Lorem ipsum dolor sit amet.',
      isSelected: false,
      isCorrect: true,
      type: ANSWER_TYPE.STAR,
      disable: false,
    },
  ]);

  const isMultiAnswer = true;

  const isWaitingPlayer = progress === PLAYING_PROGRESS.WAITING_PLAYER;

  return (
    <div className="playing">
      <GameHeader progress={progress} />
      <ButtonControl progress={progress} role={role} />
      {isWaitingPlayer ? (
        <WaitingPlayer />
      ) : (
        <>
          <QuestionInGame answersChart={answersChart} progress={progress} role={role} />
          <div className="submit">{isMultiAnswer && <div className="submit-btn">SUBMIT</div>}</div>
          <Answer answers={answers} />
        </>
      )}
    </div>
  );
};

export default Playing;
