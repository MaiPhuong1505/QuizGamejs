import { combineReducers } from 'redux';
import user from './userReducers';
import quiz from './quizReducers';

export default combineReducers({
  user,
  quiz,
});
