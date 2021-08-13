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
import { LineChart, BarChart, PieChart, ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';

export default function TabTwoScreen() {
  const [polls, setPolls] = useState([]);
  const list = [blue1, blue2, blue3, blue4, blue3, blue2, blue1];

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
          let arr = [];
          var count = 0;
          for (var i = 0; i < item.choices.length; i++) { count += item.responses[i]; }
          for (var i = 0; i < item.choices.length; i++) { arr[i] = ((item.responses[i] * 100) / (count)).toFixed(0); }

          let pollData = [];
          for (var i = 0; i < item.choices.length; i++) {
            let dic = {
              name: item.choices[i],
              population: item.responses[i],
              color: list[i],
              legendFontColor: '#7F7F7F',
              legendFontSize: 15
            };
            pollData.push(dic);
          }

          return (
            <View key={item.id} style={sharedStyles.poll}>
              <View style={{flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 5, justifyContent: 'space-between'}}>
                <View style={{height: 15, width: 15, backgroundColor: green, borderRadius: 50}}></View>
                <Text style={{fontFamily: 'hn-bold', fontSize: 18, marginLeft: 10, marginRight: 10}}>{item.title}</Text>
                <View></View>
              </View>

              <ScrollView>
                <View style={{flexDirection: 'row', backgroundColor: 'transparent', width: '100%', flex: 1, flexWrap: 'wrap'}}>
                  <View style={{marginRight: 10, backgroundColor: 'transparent', width: '25%'}}>
                  <PieChart data={pollData} width={win.width * 0.25} height={win.width * 0.25} hasLegend={false}
                    chartConfig={{
                      backgroundColor: '#e26a00',
                      backgroundGradientFrom: '#fb8c00',
                      backgroundGradientTo: '#ffa726',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      }
                    }} accessor="population" backgroundColor="transparent" paddingLeft="15"
                  />
                  </View>
                  <View style={{backgroundColor: 'transparent'}}>
                    {arr.map((percent, i) => {
                      return (
                        <View key={i} style={{backgroundColor: 'transparent', flexDirection: 'row', width: '60%'}}>
                          <Text style={{fontSize: 17, color: list[i]}}>{item.choices[i]} ({percent}%)</Text>
                          <View style={{marginLeft: 10, borderRadius: 50, width: percent + '%', backgroundColor: list[i]}}></View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
