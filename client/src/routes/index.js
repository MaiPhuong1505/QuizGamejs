import CreateQuiz from '../components/quiz/CreateQuiz';
import Game from '../pages/game';
import GameEntry from '../pages/game-entry';
import Home from '../pages/home';
import Login from '../pages/login';
import ManageQuiz from '../pages/managequiz';
import Playing from '../pages/playing';
import Profile from '../pages/profile';
import Quiz from '../pages/quiz';
import Result from '../pages/result';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/profile', component: Profile },
  { path: '/quiz/:id', component: Quiz },
  { path: '/createQuiz', component: CreateQuiz },
  { path: '/game', component: Game, layout: null },
  { path: '/entry', component: GameEntry, layout: null },
  { path: '/playing', component: Playing, layout: null },
  { path: '/playing/:id', component: Playing, layout: null },
  { path: '/result', component: Result, layout: null },
  { path: '/manageQuiz', component: ManageQuiz, layout: null },
];

const privateRoutes = [];

export { publicRoutes };
