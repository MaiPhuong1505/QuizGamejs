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
import Result from '../result';

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
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [answersChart, setAnswersChart] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);

  const isWaitingPlayer = progress === PLAYING_PROGRESS.WAITING_PLAYER;
  // let currentQuestion = questionList[currentQuestionIndex];
  const changeStartStatus = () => {
    socket.emit('Start_game', { roomId, quiz });
  };
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questionList.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      socket.emit('Next_question', { roomId, questionIndex: nextIndex });
    } else {
      socket.emit('End_game', roomId);
    }
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
      setCurrentQuestion(data?.questionsResponse[0]);
      console.log('time to send host', data.timeToSend);
    });
    socket.on('Start_game_response_for_player', (data) => {
      console.log('Start_game_response_for_player', data);
      setProgress(data?.progress);
      setQuiz(data?.quizResponse);
      setQuestionList(data?.questionsResponse);
      setCurrentQuestion(data?.questionsResponse[0]);
      setRoomId(data?.roomId);
      console.log('time to send players', data.timeToSend);
    });
    console.log('progress in playing/index.jsx', progress);
  }, [roomId]);
  // useEffect(() => {
  //   setCurrentQuestion(questionList[currentQuestionIndex]);
  // }, [currentQuestionIndex]);
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
        setPlayer({ ...player, score: data.totalScore });
      });
    }
  }, [questionList, currentQuestionIndex]);

  useEffect(() => {
    socket.on('Next_question_response_for_host', (data) => {
      setProgress(data.progress);
      setCurrentQuestion(questionList[data.questionIndex]);
    });
    socket.on('Next_question_response_for_player', (data) => {
      setProgress(data.progress);
      console.log('data.progress in next question', data.progress);

      setCurrentQuestion(questionList[data.questionIndex]);
      setCurrentQuestionIndex(data.questionIndex);
      console.log('questionList[data.questionIndex]', questionList[data.questionIndex]);
    });
  }, [questionList]);

  useEffect(() => {
    socket.on('End_game_response_for_host', (data) => {
      console.log('End_game_response_for_host', data);
      setProgress(data.progress);
      setTopPlayers(data.topPlayers);
    });
    socket.on('End_game_response_for_player', (data) => {
      console.log('End_game_response_for_player', data);
      console.log('End_game_response_for_player quiz', quiz);
      setProgress(data.progress);
      setTopPlayers(data.topPlayers);
    });
  }, []);

  return role === ROLE.PLAYER && progress === PLAYING_PROGRESS.WAITING_PLAYER ? (
    <GameEntry getPlayer={getPlayerCb} />
  ) : (
    <div>
      {progress === PLAYING_PROGRESS.END ? (
        <Result role={role} roomId={roomId} player={player} quiz={quiz} topPlayers={topPlayers} />
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
            nextFunc={moveToNextQuestion}
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
      )}
    </div>
  );
};

export default Playing;
