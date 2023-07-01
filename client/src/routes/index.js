import CreateQuiz from '../components/quiz/CreateQuiz';
import CreateQuizAuto from '../pages/create-quiz-auto/index.';
import Game from '../pages/game';
import GameEntry from '../pages/game-entry';
import Home from '../pages/home';
import Login from '../pages/login';
import Playing from '../pages/playing';
import Profile from '../pages/profile';
import QuizPage from '../pages/quiz';
import FlashCard from '../pages/flash-card';
import Quiz from '../pages/quiz';
import Result from '../pages/result';
import CreateQuestion from '../components/question/CreateQuestion';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/profile', component: Profile },
  { path: '/quiz/:id', component: QuizPage },
  { path: '/createQuiz', component: CreateQuiz },
  { path: '/game', component: Game, layout: null },
  { path: '/entry', component: GameEntry, layout: null },
  { path: '/playing', component: Playing, layout: null },
  { path: '/playing/:id', component: Playing, layout: null },
  { path: '/result', component: Result, layout: null },
  { path: '/autoCreateQuiz', component: CreateQuizAuto },
  { path: '/flashcard', component: FlashCard },
  { path: '/question', component: CreateQuestion },
];

const privateRoutes = [];

export { publicRoutes };
