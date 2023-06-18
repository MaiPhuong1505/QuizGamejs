import { postDataAPI } from '../utils/fetchData';

export const quizServices = {
  createQuiz: async (data, token) => {
    return await postDataAPI('/quiz/create', data, token);
  },
};
