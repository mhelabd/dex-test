import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDQK76eoBjvD0GfITzjK7qQuDFSdQVCyh0',
  authDomain: 'https://dex-take-home.herokuapp.com',
  databaseURL: 'https://test-db-e095e.firebaseio.com',
  projectId: 'test-db-e095e',
  storageBucket: 'test-db-e095e.appspot.com',
  messagingSenderId: '182747176288'
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const messaging = firebase.messaging();