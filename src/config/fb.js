import firebase from 'firebase/app';
import 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCpyAOi3zyJHGYNbbe8Mo4UEnzu2b7SVJM',
    authDomain: 'reusicmedia.firebaseapp.com',
    databaseURL: 'https://reusicmedia.firebaseio.com',
    projectId: 'reusicmedia',
    storageBucket: 'reusicmedia.appspot.com',
    messagingSenderId: '710164836742',
    appId: '1:710164836742:web:44997b5685501c972abc07',
    measurementId: 'G-V2KHRH9QZZ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
