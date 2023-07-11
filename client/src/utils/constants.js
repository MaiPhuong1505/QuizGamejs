export const mainColor = '#00B8F1';
export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
export const QUIZ_VISIBILITY = {
  PUBLIC: 'Public',
  INTERNAL: 'Internal',
  PRIVATE: 'Private',
};
export const QUIZ_TYPE = {
  QUIZ: 'Quiz',
  FLASHCARD: 'Flashcard',
};
export const QUESTION_DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  DIFFICULT: 'Difficult',
};
export const PLAYING_PROGRESS = {
  WAITING_PLAYER: 'WAITING_PLAYER',
  ANSWER_TIME: 'ANSWER_TIME',
  SHOW_RESULT: 'SHOW_RESULT',
  END: 'END',
};

export const AUTHEN_PROGRESS = {
  ENTER_NAME: 'ENTER_NAME',
  ENTER_PIN: 'ENTER_PIN',
};

export const ROLE = {
  PLAYER: 'PLAYER',
  HOST: 'HOST',
};

export const ANSWER_TYPE = {
  SQUARE: 'SQUARE',
  CIRCLE: 'CIRCLE',
  STAR: 'STAR',
  HEART: 'HEART',
};
