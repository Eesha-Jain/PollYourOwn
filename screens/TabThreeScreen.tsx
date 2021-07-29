import * as React from 'react';
import { Image, AsyncStorage, StyleSheet, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import {useState} from 'react';
import { Entypo } from '@expo/vector-icons';

const win = Dimensions.get('window');

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import storage from "@react-native-async-storage/async-storage";

import sharedStyles from '../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../util/colors.ts';

export default function TabThreeScreen() {
  const [blackBack, setBlackBack] = useState({});
  const [display, setDisplay] = useState("");
  const [number, setNumber] = useState(5);

  const makeRequest = async () => {
    const arrUnparsed = await storage.getItem('polls');
    const arr = JSON.parse(arrUnparsed);

    if (arr.length < 5) {
      setBlackBack({
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        height: win.height
      });
      setDisplay("none");
      setNumber(5 - arr.length);
    } else {
      setDisplay("flex");
    }
  }
  makeRequest();

  return (
    <View>
      <Image source={require('../assets/images/Title.png')} style={sharedStyles.topImage} />
      <ScrollView>
        <View style={sharedStyles.container}>
          <View style={styles.none}>
            <Entypo name="emoji-sad" size={300} color="rgb(200, 200, 200)" />
            <Text style={{color: 'gray', fontSize: 20}}>You haven't created any polls yet</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableHighlight style={styles.addButton, {}}><Text style={styles.addButtonText}>Create Poll</Text></TouchableHighlight>

      <View style={blackBack}>
        <Text style={styles.pollsCheckText}>Answer {number} more polls to unlock this feature</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  none: {
    alignItems: 'center',
    justifyContent: 'center',
    height: win.height * 0.7
  },
  addButton: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: blue1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: white,
    margin: 0,
    padding: 0,
  },
  pollsCheckText: {
    color: white,
    backgroundColor: blue1,
    padding: 20,
    fontSize: 30,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    fontFamily: "hn-ultralight"
  }
});
