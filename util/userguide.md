# Firebase

### User Document
Collection: user

{
  id: String,
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
  id: String,
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
user: user logged in (contains all their data)
- 'none' means no user logged in

### Import Statements
import storage from "@react-native-async-storage/async-storage";

### Functions
await storage.setItem(KEY, newValue);
await storage.getItem(KEY);
