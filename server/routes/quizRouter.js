import express from 'express';
import quizController from '../controllers/quizController.js';

const quizRouter = express.Router();
quizRouter.post('/quiz/create', quizController.createQuiz);
quizRouter.post('/quiz/autoCreate', quizController.createQuizAuto);
quizRouter.post('/flashcards/save', quizController.saveFlashcards);
quizRouter.get('/quiz/all/:userId', quizController.getQuizzes);
quizRouter.get('/flashcards/:userId', quizController.getQuizzesTypeFlashcard);
quizRouter.get('/quiz/:quizId', quizController.getQuizById);
quizRouter.put('/quiz/:quizId', quizController.updateQuiz);
quizRouter.delete('/quiz/:quizId', quizController.deleteQuiz);

export default quizRouter;
