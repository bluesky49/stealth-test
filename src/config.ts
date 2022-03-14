import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBnQ37dhsrY4Srl1ibEs9vTkd2K86MMhYk',
  authDomain: 'stealth-language-test.firebaseapp.com',
  databaseURL: 'https://stealth-language-test-default-rtdb.firebaseio.com',
  projectId: 'stealth-language-test',
  storageBucket: 'stealth-language-test.appspot.com',
  messagingSenderId: '481990402149',
  appId: '1:481990402149:web:163c6c65ec25110d37e68c',
  measurementId: 'G-WH8MS4SHVR',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
