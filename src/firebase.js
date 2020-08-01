import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDsq5Iil8UTAUTIYXMbUK1_QvGzLn69xAY",
  authDomain: "test-f34ad.firebaseapp.com",
  databaseURL: "https://test-f34ad.firebaseio.com",
  projectId: "test-f34ad",
  storageBucket: "test-f34ad.appspot.com",
  messagingSenderId: "781432772081",
  appId: "1:781432772081:web:7bb9efbf22bbc67a6d2050"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const messaging = firebase.messaging();