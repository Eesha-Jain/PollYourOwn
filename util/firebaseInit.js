import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwIXI3DUNVOEx3iD6Zg7fz4CSU36fTeic",
  authDomain: "pollyourown-c1227.firebaseapp.com",
  databaseURL: "https://pollyourown-c1227-default-rtdb.firebaseio.com",
  projectId: "pollyourown-c1227",
  storageBucket: "pollyourown-c1227.appspot.com",
  messagingSenderId: "888352475178",
  appId: "1:888352475178:web:061bd580f9f8b887c49b53",
  measurementId: "G-MDSHE9DDHB"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
