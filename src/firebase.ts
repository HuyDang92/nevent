import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpbPFk_j0pZavulFUY4FScmx19d8EPjwo',
  authDomain: 'nevent-401407.firebaseapp.com',
  projectId: 'nevent-401407',
  storageBucket: 'nevent-401407.appspot.com',
  messagingSenderId: '131707393120',
  appId: '1:131707393120:web:62b98e5933137e233bdf05',
  measurementId: 'G-WBDZELRYYR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
