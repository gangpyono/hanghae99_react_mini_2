import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// 파이어베이스 환경설정
const firebaseConfig = {
  // 인증정보
  apiKey: 'AIzaSyBg6EL3JH8ePUuRQR68OpHUZE9vy1ufQEo',
  authDomain: 'sparta-react-advanced.firebaseapp.com',
  projectId: 'sparta-react-advanced',
  storageBucket: 'sparta-react-advanced.appspot.com',
  messagingSenderId: '899804002337',
  appId: '1:899804002337:web:9b3f5301ffb1ec044e8b60',
  measurementId: 'G-32FE917C89',
};

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
