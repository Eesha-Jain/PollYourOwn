import * as React from 'react';
import { Image, AsyncStorage, ScrollView, TouchableHighlight, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const win = Dimensions.get('window');
import {useState, useEffect} from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, TextInput } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';
import storage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-root-toast';

import { firebase } from '../util/firebaseInit.js';
import * as sha256 from 'react-native-sha256'

import sharedStyles from '../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../util/colors.ts';

export default function Login({ navigation: { navigate } }) {
  const [email, changeEmail] = React.useState("");
  const [password, changePassword] = React.useState("");
  const [message, changeMessage] = React.useState("");

  useEffect(() => {
    if (storage.getItem('user') != 'none') {
      navigate("Tabs");
    }
  });

  async function onPress() {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                const usersRef = firebase.firestore().collection('users');
                usersRef
                    .doc(uid)
                    .get()
                    .then(async function (firestoreDocument) {
                        if (!firestoreDocument.exists) {
                            changeMessage("Error: This account does not exists");
                            return;
                        }

                        const user = firestoreDocument.data();
                        await storage.setItem('user', JSON.stringify(user));
                        let toast = Toast.show('Successfully Logged In', {
                          duration: Toast.durations.SHORT,
                          position: Toast.positions.BOTTOM,
                          shadow: false,
                          animation: true,
                          hideOnPress: true,
                          backgroundColor: 'white',
                          textColor: 'black',
                          opacity: 0.5
                        });

                        navigate("Tabs");
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

  function onNavigate() {
    navigate("Signup");
  }

  return (
    <ScrollView>
      <View style={sharedStyles.container}>
        <Image source={require('../assets/images/icon.png')} style={styles.image} />

        <Text style={styles.title}>LOG-IN</Text>

        <TextInput
          placeholder="email"
          onChangeText={(text) => {changeEmail(text)}}
          value={email}
          style={styles.input}
        />

        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {changePassword(text)}}
          value={password}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress()}>
            <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>

         <Text style={{fontSize: 20, color: 'red', marginBottom: 20, textAlign: 'center'}}>{message}</Text>

         <Text style={{fontSize: 14}}>Need to Create an Account?
            <TouchableHighlight style={{padding: 0, margin: 0, paddingLeft: 4}} onPress={() => onNavigate()}>
               <Text style={{color: 'green', fontSize: 14, padding: 0, margin: 0, marginBottom: -3}}>Signup Here</Text>
            </TouchableHighlight>
          </Text>
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
