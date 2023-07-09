import { QUIZ_TYPES } from '../actions/quizAction';

const initialState = {};

const quizReducers = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_TYPES.GET_QUIZ:
      return action.payload;
    default:
      return state;
  }
};

export default quizReducers;
