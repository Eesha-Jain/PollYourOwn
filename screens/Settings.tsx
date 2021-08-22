import * as React from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons';
const win = Dimensions.get('window');
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import storage from "@react-native-async-storage/async-storage";
import { firebase } from '../util/firebaseInit.js';
import sharedStyles from '../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white, list } from '../util/colors.ts';

export default function TabFourScreen({ navigation: { navigate } }) {
  
  async function signOut() {
    try {
      await storage.removeItem('user');
      navigate("Login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
   <View style={sharedStyles.container}>
      <Image source={require('../assets/images/Title.png')} style={sharedStyles.topImage} />
      <TouchableOpacity onPress={() => {signOut()}} style={[styles.addButton, {marginTop: 20, marginBottom: 10}]}><Text style={styles.addButtonText}>Sign Out</Text></TouchableOpacity>
   </View>
  );
}


const styles = StyleSheet.create({
  addButton: {
    width: win.width - 40,
    padding: 10,
    borderRadius: 50,
    backgroundColor: blue1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: white,
    margin: 0,
    padding: 0,
  }
});
