import { GLOBALTYPES } from '../actions/globalTypes';

const initialState = {};

const quizReducers = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.QUIZ:
      return action.payload;
    default:
      return state;
  }
};

export default quizReducers;
