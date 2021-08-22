import * as React from 'react';
import { Image, AsyncStorage, StyleSheet, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
const win = Dimensions.get('window');
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import storage from "@react-native-async-storage/async-storage";
import { firebase } from '../util/firebaseInit.js';
import sharedStyles from '../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../util/colors.ts';
import { PieChart } from 'react-native-chart-kit';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {PollAnswered} from '../util/PollAnswered';

export default function TabTwoScreen() {
  let [polls, setPolls] = useState([]);
  let [dic, setDic] = useState({});
  let [scrollView, setScrollView] = useState([<View key={0}></View>]);
  const list = [blue1, blue2, blue3, blue4, blue3, blue2, blue1];

  useEffect(() => {
    const makeRequest = async () => {
      const userUnparsed = await storage.getItem('user');
      let user = JSON.parse(userUnparsed);

      await firebase.firestore().collection('users').doc(user.id).get().then(async function (doc) {
        let pollsAnswered = doc.data().pollsAnswered;
        polls = [];
        dic = {};

        for (var i = 0; i < pollsAnswered.length; i++) {
          let pollsTemp = [];
          await firebase.firestore().collection('polls').where("id", "==", pollsAnswered[i]).get().then((querySnapshot) => {
            querySnapshot.forEach((poll) => {
              var item = poll.data();
              polls.push(item);

              let arr = [];
              var count = 0;
              for (var i = 0; i < item.choices.length; i++) { count += item.responses[i]; }
              for (var i = 0; i < item.choices.length; i++) { arr[i] = ((item.responses[i] * 100) / (count)).toFixed(0); }

              let pollData = [];
              for (var i = 0; i < item.choices.length; i++) {
                let d = {
                  name: item.choices[i],
                  population: item.responses[i],
                  color: list[i],
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15
                };
                pollData.push(d);
              }

              dic[item.title] = [arr, pollData];
            })
          });
        }

        setScrollView([<PollAnswered key={0} polls={polls} dic={dic} />]);
      });
    }

    makeRequest();
  }, [polls]);

  return (
    <View style={[sharedStyles.container, {padding: 0}]}>
      <Image source={require('../assets/images/Title.png')} style={sharedStyles.topImage} />

      <ScrollView style={{paddingTop: 5}}>
      {scrollView}
      </ScrollView>
    </View>
  );
}
