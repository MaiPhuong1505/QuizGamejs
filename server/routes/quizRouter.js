import express from 'express';
import quizController from '../controllers/quizController.js';

const quizRouter = express.Router();
quizRouter.post('/quiz/create', quizController.createQuiz);
quizRouter.get('/quiz/all', quizController.getQuizzes);
quizRouter.get('/quiz/:quizId', quizController.getQuizById);
quizRouter.put('/quiz/:quizId', quizController.updateQuiz);
quizRouter.delete('/quiz/:quizId', quizController.deleteQuiz);

export default quizRouter;
