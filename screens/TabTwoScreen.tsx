import * as React from 'react';
import { Image, AsyncStorage, StyleSheet, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons';
const win = Dimensions.get('window');
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import storage from "@react-native-async-storage/async-storage";
import { firebase } from '../util/firebaseInit.js';
import sharedStyles from '../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../util/colors.ts';

export default function TabTwoScreen() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const makeRequest = async () => {
      const userUnparsed = await storage.getItem('user');
      let user = JSON.parse(userUnparsed);

      await firebase.firestore().collection('users').doc(user.id).get().then(async function (doc) {
        let pollsAnswered = doc.data().pollsAnswered;

        for (var i = 0; i < pollsAnswered.length; i++) {
          let pollsTemp = [];
          await firebase.firestore().collection('polls').where("id", "==", pollsAnswered[i]).get().then((querySnapshot) => {
            querySnapshot.forEach((poll) => {
              pollsTemp.push(poll.data());
            })
          });

          setPolls(pollsTemp);
        }
      });
    }
    makeRequest();
  });

  return (
    <View style={sharedStyles.container}>
      <Image source={require('../assets/images/Title.png')} style={sharedStyles.topImage} />

      <ScrollView style={{paddingTop: 20}}>
        {polls.map((item) => {
          return (
            <View key={item.id} style={sharedStyles.poll}>
              <View style={{flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 5, justifyContent: 'space-between'}}>
                <View style={{height: 15, width: 15, backgroundColor: green, borderRadius: 50}}></View>
                <Text style={{fontFamily: 'hn-bold', fontSize: 18, marginLeft: 10, marginRight: 10}}>{item.title}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
