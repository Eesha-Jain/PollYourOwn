import * as React from 'react';
import { StyleSheet, Image, Button, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
const win = Dimensions.get('window');

import * as Font from 'expo-font';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';
import storage from "@react-native-async-storage/async-storage";

import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../util/colors.ts';

export default function FirstScreen ({ navigation: { navigate } }) {
  async function navigateTabs() {
    await storage.setItem('firsttime', 'false');
    navigate("Signup")
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome To</Text>
        <Image source={require('../assets/images/FirstScreenImage.png')} style={styles.topImage} />
        <Text style={styles.pitch}>Create polls anonymously for your community to answer! Get a completely random sample of data!</Text>
        <TouchableHighlight style={styles.button} onPress={() => navigateTabs()}><Text style={{fontSize: 20, color: white}}>Start Now!</Text></TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: win.height,
    alignItems: 'center',
    padding: 20
  },
  welcome: {
    fontSize: 50,
    color: blue1,
    fontFamily: 'hn-bold'
  },
  topImage: {
    width: win.width * 0.8,
    height: win.width * 0.8 * (594 / 678),
    marginBottom: 20
  },
  pitch: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'hn-ultralight'
  },
  button: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: blue1,
  }
});
