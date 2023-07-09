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
import { Button } from '@mui/material';

const Playing = () => {
  const { user } = useSelector((state) => state);
  console.log('user in playing', user);

  const { id } = useParams();

  const [pinCode, setPinCode] = useState('');
  const [roomId, setRoomId] = useState('');
  const [progress, setProgress] = useState(PLAYING_PROGRESS.WAITING_PLAYER);
  const [role, setRole] = useState(ROLE.PLAYER);
  const [quiz, setQuiz] = useState({});
  const [player, setPlayer] = useState({});
  const [result, setResult] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [answersChart, setAnswersChart] = useState([]);
  // {
  //   percent: '0%',
  //   type: ANSWER_TYPE.SQUARE,
  //   answer: '',
  //   count: '0',
  // },
  // {
  //   percent: '0%',
  //   type: ANSWER_TYPE.CIRCLE,
  //   answer: '',
  //   count: '0',
  // },
  // {
  //   percent: '0%',
  //   type: ANSWER_TYPE.HEART,
  //   answer: '',
  //   count: '0',
  // },
  // {
  //   percent: '0%',
  //   type: ANSWER_TYPE.STAR,
  //   answer: '',
  //   count: '0',
  // },

  const isWaitingPlayer = progress === PLAYING_PROGRESS.WAITING_PLAYER;
  let currentQuestion = questionList[currentQuestionIndex];
  const changeStartStatus = () => {
    socket.emit('Start_game', { roomId, quiz });
  };
  const getPlayerCb = (player) => {
    setPlayer(player);
  };

  console.log('player callback', player);

  useEffect(() => {
    const getQuizById = async (id, token) => {
      try {
        const response = await quizServices.getQuizById(id, token);
        console.log('response in playing/index.jsx', response.data);
        if (response.data.quiz) {
          setQuiz(response.data.quiz);
          setQuestionList(response.data.quiz?.questions);
          setProgress(PLAYING_PROGRESS.WAITING_PLAYER);
        }
      } catch (error) {
        console.log('getQuizById', error);
      }
    };
    if (user.token && id) {
      setRole(ROLE.HOST);
      getQuizById(id, user.token);

      // socket.on('New_game', (newGameData) => {
      //   console.log('newGameData in host', newGameData);
      //   setPinCode(newGameData.code);
      //   setRoomId(newGameData._id);
      // });
    }
  }, []);
  console.log('quiz in playing/index.jsx', quiz);
  useEffect(() => {
    if (user.token && id) {
      socket.on('New_game', (newGameData) => {
        console.log('newGameData in host', newGameData);
        setPinCode(newGameData.code);
        setRoomId(newGameData._id);
        setProgress(PLAYING_PROGRESS.WAITING_PLAYER);
      });
    }
  }, []);

  useEffect(() => {
    if (quiz.questions) {
      setQuestionList(quiz.questions);
    }
  }, [quiz]);
  useEffect(() => {
    socket.on('Start_game_response_for_host', (data) => {
      console.log('Start_game_response_for_host', data);
      setProgress(data.progress);
      setQuestionList(data.questionsResponse);
      console.log('time to send host', data.timeToSend);
    });
    socket.on('Start_game_response_for_player', (data) => {
      console.log('Start_game_response_for_player', data);
      setProgress(data?.progress);
      setQuiz(data?.quizResponse);
      setQuestionList(data?.questionsResponse);
      setRoomId(data?.roomId);
      console.log('time to send players', data.timeToSend);
    });
    console.log('progress in playing/index.jsx', progress);
  }, [roomId]);
  useEffect(() => {
    if (questionList) {
      socket.on('Question_result_for_host', (data) => {
        console.log('Players list Question_result_for_host', data.playerResult);
        setProgress(data?.progress);
        setAnswersChart(data.playerResult);
      });
      socket.on('Show_result_response', (data) => {
        console.log('Show_result_response');
        if (data === PLAYING_PROGRESS.SHOW_RESULT) {
          setProgress(data);
        }
      });
      socket.on('Question_result_for_player', (data) => {
        console.log('Question_result_for_player data', data);
        setResult(data);
      });
    }
  }, [questionList]);
  return role === ROLE.PLAYER && progress === PLAYING_PROGRESS.WAITING_PLAYER ? (
    <GameEntry getPlayer={getPlayerCb} />
  ) : (
    <div className="playing">
      <GameHeader
        progress={progress}
        pinCode={pinCode}
        quiz={quiz}
        time={currentQuestion?.time}
        currentIndex={currentQuestionIndex}
      />
      <ButtonControl
        progress={progress}
        role={role}
        roomId={roomId}
        question={currentQuestion}
        result={result}
        startFunc={changeStartStatus}
      />
      {isWaitingPlayer ? (
        <WaitingPlayer roomId={roomId} />
      ) : (
        <>
          <QuestionInGame
            question={currentQuestion}
            answersChart={answersChart}
            progress={progress}
            role={role}
            result={result}
          />
          {
            <div className="submit">
              {role === ROLE.PLAYER && currentQuestion?.isMultipleAnswer && (
                <Button className="submit-btn">SUBMIT</Button>
              )}
            </div>
          }
          <Answer
            question={currentQuestion}
            progress={progress}
            role={role}
            player={player}
            time={currentQuestion?.time}
            roomId={roomId}
            result={result}
          />
        </>
      )}
    </div>
  );
};

export default Playing;
