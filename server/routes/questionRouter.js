import express from 'express';
import questionController from '../controllers/questionController.js';

const questionRouter = express.Router();
questionRouter.post('/question/create', questionController.createQuestion);
questionRouter.get('/question/:id', questionController.getQuestionById);
questionRouter.put('/question/:id', questionController.updateQuestion);
questionRouter.delete('/question/:id', questionController.deleteQuestion);

export default questionRouter;
