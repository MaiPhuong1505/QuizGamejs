import { quizServices } from '../../services/quizServices';
import { GLOBALTYPES } from './globalTypes';

export const QUIZ_TYPES = {
  GET_QUIZ: 'GET_QUIZX',
};
export const getQuiz = (id, token) => async (dispatch) => {
  try {
    const response = await quizServices.getQuizById(id, token);
    dispatch({ type: QUIZ_TYPES.GET_QUIZ, payload: { ...response.data.quiz } });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};
