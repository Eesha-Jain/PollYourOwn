import * as React from 'react';
import { Image, AsyncStorage, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';

import sharedStyles from '../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../util/colors.ts';

export default function Login({ navigation: { navigate } }) {
  const [email, changeEmail] = React.useState("");
  const [username, changeUsername] = React.useState("");
  const [password, changePassword] = React.useState("");
  const [message, changeMessage] = React.useState("");

  function onPress() {
  }

  function onNavigate() {
    navigate("Signup")
  }

  return (
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
          <Text style={styles.buttonText}>Login</Text>
       </TouchableOpacity>

       <Text>{message}</Text>
       <Text>Need to Create an Account? <TouchableOpacity
         onPress={() => onNavigate()}>
           <Text style={{color: 'green'}}>Sign Up Here</Text>
        </TouchableOpacity></Text>
    </View>
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
    minWidth: 400
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
