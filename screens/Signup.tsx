import * as React from 'react';
import { Image, AsyncStorage, ScrollView, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const win = Dimensions.get('window');

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';

import { firebase } from '../util/firebaseInit.js';
import * as sha256 from 'react-native-sha256'

import sharedStyles from '../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../util/colors.ts';

export default function Login({ navigation: { navigate } }) {
  const [email, changeEmail] = React.useState("");
  const [username, changeUsername] = React.useState("");
  const [password, changePassword] = React.useState("");
  const [message, changeMessage] = React.useState("");

  async function onPress() {
    /*var hashed = "";
    await sha256.sha256(password).then( ( hash: any ) => { hashed = hash });
    console.log(hashed);*/

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
          const uid = response.user.uid
          const data = {
            id: uid,
            email: email,
            username: username,
            password: password,
            firsttime: true,
            polls: [],
            pollsAnswered: []
          };
          const usersRef = firebase.firestore().collection('users')
          usersRef
              .doc(uid)
              .set(data)
              .then(() => {
                  changeMessage("Successfully Signed In!");
                  //setTimeout(() => { navigate("Tabs", {user: data}) }, 2000);
              }).catch((error) => {
                  changeMessage("ERROR: " + error.message);
              });
      }).catch((error) => {
          changeMessage("ERROR: " + error.message);
      });
  }

  return (
    <ScrollView>
      <View style={sharedStyles.container}>
        <Image source={require('../assets/images/icon.png')} style={styles.image} />

        <Text style={styles.title}>SIGN-UP</Text>

        <TextInput
          placeholder="email"
          onChangeText={(text) => {changeEmail(text)}}
          value={email}
          style={styles.input}
        />

        <TextInput
          placeholder="username"
          onChangeText={(text) => {changeUsername(text)}}
          value={username}
          style={styles.input}
        />

        <TextInput
          placeholder="password"
          onChangeText={(text) => {changePassword(text)}}
          value={password}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress()}>
            <Text style={styles.buttonText}>Sign Up</Text>
         </TouchableOpacity>

         <Text style={{fontSize: 20, color: 'red', marginBottom: 20, textAlign: 'center'}}>{message}</Text>

         <Text>Already Have an Account? <TouchableOpacity
           onPress={() => onNavigate()}>
             <Text style={{color: 'green'}}>Login Here</Text>
          </TouchableOpacity></Text>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 20
  },
  title: {
    color: '#737373',
    fontSize: 40,
    fontFamily: 'hn-bold'
  },
  input: {
    backgroundColor: "rgba(90, 171, 198, 0.2)", //blue4
    padding: 15,
    margin: 10,
    minWidth: 200,
    width: win.width * 0.9
  },
  button: {
    margin: 20,
    backgroundColor: blue1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 50
  },
  buttonText: {
    color: white
  }
});
