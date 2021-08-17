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

export default function TabOneScreen() {
  const [validPolls, setValidPolls] = useState([]);
  const list = [blue1, blue2, blue3, blue4, blue3, blue2, blue1];

  useEffect(() => {
    const makeRequest = async () => {
      const userUnparsed = await storage.getItem('user');
      let user = JSON.parse(userUnparsed);

      await firebase.firestore().collection('users').doc(user.id).get().then(async function (doc) {
        user = doc.data();
        await storage.setItem('user', JSON.stringify(user));
      })

      await firebase.firestore().collection('polls').get().then((querySnapshot) => {
        let polls = [];
        querySnapshot.forEach((doc) => {
          const entity = doc.data();
          if (user["pollsAnswered"].indexOf(entity.id) == -1 && user["polls"].indexOf(entity.id) == -1 && entity.publish == true && user["skip"].indexOf(entity.id) == -1) {
            polls.push(entity);
          }
        });
        setValidPolls(polls);
      });
    }
    makeRequest();
  });

  async function answer(pollId, choiceIndex) {
    const userUnparsed = await storage.getItem('user');
    let user = JSON.parse(userUnparsed);

    await firebase.firestore().collection('polls').where("id", "==", pollId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let entity = doc.data();
        entity.responses[choiceIndex] += 1;
        user.pollsAnswered.push(pollId);
        doc.ref.update(entity);
      })
    });

    await firebase.firestore().collection('users').doc(user.id).set(user).then(async () => {
      await storage.setItem('user', JSON.stringify(user));
    });
  }

  async function skipPoll(pollId) {
    const userUnparsed = await storage.getItem('user');
    let user = JSON.parse(userUnparsed);

    user.skip.push(pollId);

    await firebase.firestore().collection('users').doc(user.id).set(user).then(async () => {
      await storage.setItem('user', JSON.stringify(user));
    });
  }

  return (
    <View style={sharedStyles.container}>
      <Image source={require('../assets/images/Title.png')} style={sharedStyles.topImage} />

      <ScrollView style={{paddingTop: 20}}>
        {validPolls.map((item) => {
          return (
            <View key={item.id} style={sharedStyles.poll}>
              <View style={{flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 5, justifyContent: 'space-between'}}>
                <View style={{height: 15, width: 15, backgroundColor: red, borderRadius: 50}}></View>
                <Text style={{fontFamily: 'hn-bold', fontSize: 18, marginLeft: 0, marginRight: 5}}>{item.title}</Text>
                <TouchableHighlight onPress={() => {skipPoll(item.id)}}><Text style={{color: 'rgb(103, 103, 103);', position: 'absolute', top: 0, right: 0}}>X</Text></TouchableHighlight>
              </View>

              <View style={{backgroundColor: 'transparent', flex: 1, flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%'}}>
                {item.choices.map((choice, i) => {
                  return (
                    <TouchableHighlight key={i} onPress={() => {answer(item.id, i)}}><View style={{backgroundColor: list[i], padding: 10, paddingLeft: 15, paddingRight: 15, minWidth: 50, borderRadius: 10, margin: 3}}><Text style={{color: 'white', fontFamily: 'hn-ultralight', textAlign: 'center'}}>{choice.toUpperCase()}</Text></View></TouchableHighlight>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
