import CreateQuiz from '../pages/quiz/CreateQuiz';
import CreateQuizAuto from '../pages/create-quiz-auto/index.';
import Home from '../pages/home';
import Login from '../pages/login';
import Playing from '../pages/playing';
import Profile from '../pages/profile';
import QuizPage from '../pages/quiz';
import FlashCard from '../pages/flash-card';
import CreateQuestion from '../components/question/CreateQuestion';
import UpdateQuiz from '../pages/quiz/UpdateQuiz';
import UpdateQuestion from '../components/question/UpdateQuestion';
import NotFound from '../pages/error/NotFound';
import ResultAnonymous from '../pages/result/ResultAnonymous';
import FlashCardContent from '../pages/flash-card-content';
import ViewHistory from '../pages/view-history';
import ViewHistoryDetail from '../pages/view-history-detail';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '/404', component: NotFound, layout: null },
  { path: '/profile', component: Profile },
  { path: '/quiz/:id', component: QuizPage },
  { path: '/createQuiz', component: CreateQuiz },
  { path: '/updateQuiz/:id', component: UpdateQuiz },
  { path: '/playing', component: Playing, layout: null },
  { path: '/playing/:id', component: Playing, layout: null },
  // { path: '/result', component: ResultAnonymous, layout: null },
  { path: '/autoCreateQuiz', component: CreateQuizAuto },
  { path: '/flashcard', component: FlashCard },
  { path: '/createQuestion', component: CreateQuestion },
  { path: '/updateQuestion/:id', component: UpdateQuestion },
  { path: '/flashcardContent/:id', component: FlashCardContent },
  { path: '/viewHistory', component: ViewHistory, layout: null },
  { path: '/historyDetail/:id', component: ViewHistoryDetail, layout: null },
];

const privateRoutes = [];

export { publicRoutes };
