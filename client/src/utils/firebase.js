// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCoodUpt606XXYtiQfbXFIfYD1UdMaPzhM',
  authDomain: 'quizgame-e00c9.firebaseapp.com',
  projectId: 'quizgame-e00c9',
  storageBucket: 'quizgame-e00c9.appspot.com',
  messagingSenderId: '532996437890',
  appId: '1:532996437890:web:be005b3d8b92ad6547019b',
  measurementId: 'G-FN7EPK7Z43',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
