import React from 'react';
import './Result.scss';
import { QUIZ_VISIBILITY, ROLE } from '../../utils/constants';
import { Button } from '@mui/material';
import { ExitToApp, Save } from '@mui/icons-material';
import { quizServices } from '../../services/quizServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResultAnonymous = () => {
  const role = ROLE.PLAYER;
  const player = { score: 123 };
  const topPlayers = [
    { nickname: 'A', score: '9876' },
    { nickname: 'B', score: '8976' },
    { nickname: 'C', score: '7986' },
  ];
  const quiz = {
    title: 'Review OOAD',
    description: 'Bộ đề ôn tập OOAD',
    visibility: 'Public',
    questions: [
      {
        _id: '6493c70524d2538d8239d4e4',
        question: 'Thành phần nào sau đây không là đặc tính của một đối tượng',
        answerOptions: [
          {
            answer: 'Identity',
            isCorrect: false,
            _id: '6493c70524d2538d8239d4e5',
          },
          {
            answer: 'Behaviour',
            isCorrect: false,
            _id: '6493c70524d2538d8239d4e6',
          },
          {
            answer: 'Action',
            isCorrect: true,
            _id: '6493c70524d2538d8239d4e7',
          },
          {
            answer: 'State',
            isCorrect: false,
            _id: '6493c70524d2538d8239d4e8',
          },
        ],
        isMultipleAnswer: false,
        time: 30,
        difficulty: 'Easy',
        quizzes: ['6493c69a24d2538d8239d4de'],
        createdAt: '2023-06-22T03:59:01.343Z',
        updatedAt: '2023-06-22T03:59:01.343Z',
        __v: 0,
      },
      {
        _id: '6493c72524d2538d8239d4eb',
        question: 'Đường sinh tồn (lifeline) của 1 đối tượng được trình bày trong sơ đồ',
        answerOptions: [
          {
            answer: 'Sơ đồ đối tượng',
            isCorrect: false,
            _id: '6493c72524d2538d8239d4ec',
          },
          {
            answer: 'Sơ đồ trạng thái',
            isCorrect: false,
            _id: '6493c72524d2538d8239d4ed',
          },
          {
            answer: 'Sơ đồ tuần tự',
            isCorrect: true,
            _id: '6493c72524d2538d8239d4ee',
          },
          {
            answer: 'Sơ đồ triển khai',
            isCorrect: false,
            _id: '6493c72524d2538d8239d4ef',
          },
        ],
        isMultipleAnswer: false,
        time: 30,
        difficulty: 'Easy',
        quizzes: ['6493c69a24d2538d8239d4de'],
        createdAt: '2023-06-22T03:59:33.913Z',
        updatedAt: '2023-06-22T03:59:33.913Z',
        __v: 0,
      },
      {
        _id: '6493c75f24d2538d8239d4f2',
        question:
          'Nếu ta muốn tổ chức các phần tử (elements) vào trong các nhóm có thể sử dụng lại được với tất cả các thông tin được che giấu, ta có thể sử dụng một trong các cấu trúc nào của UML',
        answerOptions: [
          {
            answer: 'Package',
            isCorrect: true,
            _id: '6493c75f24d2538d8239d4f3',
          },
          {
            answer: 'Class',
            isCorrect: false,
            _id: '6493c75f24d2538d8239d4f4',
          },
          {
            answer: 'Class hoặc Interface',
            isCorrect: false,
            _id: '6493c75f24d2538d8239d4f5',
          },
          {
            answer: 'Subsystem hoặc Component',
            isCorrect: false,
            _id: '6493c75f24d2538d8239d4f6',
          },
        ],
        isMultipleAnswer: false,
        time: 30,
        difficulty: 'Easy',
        quizzes: ['6493c69a24d2538d8239d4de'],
        createdAt: '2023-06-22T04:00:31.485Z',
        updatedAt: '2023-06-22T04:00:31.485Z',
        __v: 0,
      },
      {
        _id: '6493c79a24d2538d8239d4f9',
        question:
          'Trong giai đoạn nào của quy trình phát triển phần mềm, ta xác định chi phí và thời gian của dự án, xác định các rủi ro và môi trường hệ thống?',
        answerOptions: [
          {
            answer: 'Khởi tạo (Inception)',
            isCorrect: true,
            _id: '6493c79a24d2538d8239d4fa',
          },
          {
            answer: 'Tinh chế (Elaboration)',
            isCorrect: false,
            _id: '6493c79a24d2538d8239d4fb',
          },
          {
            answer: 'Xây dựng (Construction)',
            isCorrect: false,
            _id: '6493c79a24d2538d8239d4fc',
          },
          {
            answer: 'Chuyển giao (Transition)',
            isCorrect: false,
            _id: '6493c79a24d2538d8239d4fd',
          },
        ],
        isMultipleAnswer: false,
        time: 30,
        difficulty: 'Easy',
        quizzes: ['6493c69a24d2538d8239d4de'],
        createdAt: '2023-06-22T04:01:30.362Z',
        updatedAt: '2023-06-22T04:01:30.362Z',
        __v: 0,
      },
    ],
  };
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();

  console.log('quiz in result component', quiz);
  const handleSaveToFlashcards = async () => {
    const sentData = {
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      questions: quiz.questions,
    };
    if (user?.token) {
      const savedFlashcards = await quizServices.saveFlashcard({ ...sentData, user: user.user._id }, user.token);
      console.log('savedFlashcards', savedFlashcards);
      navigate('/flashcard');
    } else {
      sessionStorage.setItem('flashcardData', JSON.stringify(sentData));
      navigate('/login');
    }
  };
  return (
    <div className={`result ${role === ROLE.PLAYER ? 'result-player-role' : ''}`}>
      <div className={`result-inner ${role === ROLE.PLAYER ? 'result-inner-player-role' : ''}`}>
        {quiz.visibility === QUIZ_VISIBILITY.PUBLIC && role === ROLE.PLAYER && (
          <div className="btn-save-quiz">
            <Button variant="contained" endIcon={<Save />} onClick={handleSaveToFlashcards}>
              Save quiz to your Flashcards
            </Button>
          </div>
        )}
        {role === ROLE.HOST && (
          <div className="btn-exit">
            <Button variant="contained" endIcon={<ExitToApp />}>
              Exit
            </Button>
          </div>
        )}
        <div className="result-rank">
          <div className="result-rank-second">
            <div className="player">{topPlayers[1]?.nickname || ''}</div>
            <div className="player-score">{topPlayers[1]?.score || ''}</div>
          </div>
          <div className="result-rank-first">
            <div className="player">{topPlayers[0]?.nickname}</div>
            <div className="player-score">{topPlayers[0]?.score}</div>
          </div>
          <div className="result-rank-third">
            <div className="player">{topPlayers[2]?.nickname || ''}</div>
            <div className="player-score">{topPlayers[2]?.score || ''}</div>
          </div>
        </div>
      </div>
      {role === ROLE.PLAYER && (
        <div className="result-score">
          <p>Your score is {player?.score}.</p>
          <p>Congratulations!</p>
        </div>
      )}
    </div>
  );
};

export default ResultAnonymous;
