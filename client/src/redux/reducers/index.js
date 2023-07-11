import { combineReducers } from 'redux';
import user from './userReducers';
import quizReducer from './quizReducers';

export default combineReducers({
  user,
  quizReducer,
});
