# Firebase

### User Document
Collection: user

{
  id: Integer,
  email: String,
  username: String,
  password: String,
  firsttime: Boolean,
  polls: Integer [] (ids of polls),
  pollsAnswered: Integer [] (ids of polls)
}

### Polls Document
Collection: polls

{
  id: Integer,
  title: String,
  choices: String [],
  responses: Integer []
  multiResponses: Boolean,
  responseEdit: Boolean,
  publish: Boolean
}

### Import Statements
import * as firebase from 'firebase';
import { firebase } from '../util/firebaseInit.js';

### Functions
https://www.freecodecamp.org/news/react-native-firebase-tutorial/ (this will be updated later)

# Local Storage

### Keys
jwt: user logged in
uid: id of user logged in

### Import Statements
import storage from "@react-native-async-storage/async-storage";

### Functions
await storage.setItem(KEY, newValue);
await storage.getItem(KEY);
