import express from 'express';
import gameHistoryController from '../controllers/gameHistoryController.js';

const historyRouter = express.Router();
historyRouter.get('/histories/:userId', gameHistoryController.getAllGameHistories);
export default historyRouter;
