import { Fragment, ReactNode } from 'react';
import Quiz from '../pages/quiz';
import Home from '../pages/home';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Game from '../pages/game';
import Result from '../pages/result';
import CreateQuiz from '../components/quiz/CreateQuiz';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/profile', component: Profile },
  { path: '/quiz/:id', component: Quiz },
  { path: '/createQuiz', component: CreateQuiz },
  { path: '/game', component: Game, layout: null },
  { path: '/result', component: Result, layout: null },
];

const privateRoutes = [];

export { publicRoutes };
