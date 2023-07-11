import { quizServices } from '../../services/quizServices';
import { GLOBALTYPES } from './globalTypes';

export const QUIZ_TYPES = {
  GET_QUIZ: 'GET_QUIZ',
};
export const getQuiz = (id, token) => async (dispatch) => {
  try {
    const response = await quizServices.getQuizById(id, token);
    console.log('response in getQuiz action', response);
    dispatch({ type: QUIZ_TYPES.GET_QUIZ, payload: { storeQuiz: response.data.quiz } });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
