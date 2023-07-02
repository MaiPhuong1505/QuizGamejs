import React, { useState, useEffect } from 'react';
import './Playing.scss';
import { ANSWER_TYPE, PLAYING_PROGRESS, ROLE } from '../../utils/constants';
import GameHeader from '../../components/game-header';
import ButtonControl from '../../components/playing/button-control';
import WaitingPlayer from '../../components/playing/waiting-player';
import QuestionInGame from '../../components/playing/question-in-game';
import Answer from '../../components/playing/answer';
import { socket } from '../../socketClient';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { quizServices } from '../../services/quizServices';
import GameEntry from '../game-entry';

const Playing = () => {
  const { user } = useSelector((state) => state);
  console.log('user in playing', user);

  const { id } = useParams();

  const [pinCode, setPinCode] = useState('');
  const [roomId, setRoomId] = useState('');
  const [progress, setProgress] = useState(PLAYING_PROGRESS.WAITING_PLAYER);
  const [role, setRole] = useState(ROLE.PLAYER);
  const [quiz, setQuiz] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [answersChart, setAnswersChart] = useState([
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

  const isWaitingPlayer = progress === PLAYING_PROGRESS.WAITING_PLAYER;
  let currentQuestion = questionList[currentQuestionIndex];
  const changeStartStatus = (status) => {
    setProgress(status);
  };

  useEffect(() => {
    if (user.token && id) {
      const data = { quizId: id, hostId: user.user._id };
      socket.emit('Get_PIN_code_from_server', data);
      socket.on('New_game', (newGameData) => {
        console.log('newGameData in host', newGameData);
        setPinCode(newGameData.code);
        setRoomId(newGameData._id);
      });
    }
  }, []);
  useEffect(() => {
    const getQuizById = async (id, token) => {
      try {
        const response = await quizServices.getQuizById(id, token);
        console.log('response', response.data);
        if (response.data.quiz) {
          setQuiz(response.data.quiz);
          setQuestionList(response.data.quiz.questions);
        }
      } catch (error) {
        console.log('getQuizById', error);
      }
    };
    if (user.token && id) {
      setRole(ROLE.HOST);
      getQuizById(id, user.token);
    }
  }, []);
  useEffect(() => {
    if (quiz.questions) {
      setQuestionList(quiz.questions);
    }
  }, [quiz]);

  return role === ROLE.PLAYER && progress === PLAYING_PROGRESS.WAITING_PLAYER ? (
    <GameEntry />
  ) : (
    <div className="playing">
      <GameHeader
        progress={progress}
        pinCode={pinCode}
        quiz={quiz}
        time={currentQuestion?.time}
        currentIndex={currentQuestionIndex}
      />
      <ButtonControl progress={progress} role={role} startFunc={changeStartStatus} />
      {isWaitingPlayer ? (
        <WaitingPlayer roomId={roomId} />
      ) : (
        <>
          <QuestionInGame question={currentQuestion} answersChart={answersChart} progress={progress} role={role} />
          <div className="submit">{currentQuestion.isMultipleAnswer && <div className="submit-btn">SUBMIT</div>}</div>
          <Answer answers={currentQuestion.answerOptions} />
        </>
      )}
    </div>
  );
};

export default Playing;
