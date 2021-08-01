import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID } from 'react-native-dotenv';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// Initialize Firebase
var firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    databaseURL: DATABASEURL,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
    measurementId: MEASUREMENTID
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export {db};

/*USER GUIDE
import { db } from '../util/firebaseInit.js';

dn.collection("number").doc(1).set({
  pollNumber: Integer
})

db.collection("polls").doc(pollNumber).set({
  id: Integer,
  title: String,
  choices: String [],
  responses: Integer []
  multiResponses: Boolean,
  responseEdit: Boolean,
  publish: Boolean
})
*/
