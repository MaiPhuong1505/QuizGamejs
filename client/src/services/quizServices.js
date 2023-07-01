import { getDataAPI, postDataAPI, putDataAPI } from '../utils/fetchData';

export const quizServices = {
  createQuiz: async (data, token) => {
    return await postDataAPI('quiz/create', data, token);
  },
  getQuizzes: async (userId, token) => {
    return await getDataAPI(`quiz/all/${userId}`, token);
  },
  getQuizById: async (quizId, token) => {
    return await getDataAPI(`quiz/${quizId}`, token);
  },
  updateQuiz: async (quizId, data, token) => {
    return await putDataAPI(`quiz/${quizId}`, data, token);
  },
  createQuizAutoApi: async (data, token) => {
    return await postDataAPI(`quiz/autoCreate`, data, token);
  },
  createQuestion: async (data, token) => {
    return await postDataAPI('question/create', data, token);
  },
};
