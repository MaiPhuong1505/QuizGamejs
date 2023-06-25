import { getDataAPI, postDataAPI } from '../utils/fetchData';

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
  createQuizAutoApi: async (data, token) => {
    return await postDataAPI(`quiz/autoCreate`, data, token);
  },
};
