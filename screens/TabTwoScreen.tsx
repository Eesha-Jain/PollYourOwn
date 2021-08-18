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
import { LineChart, BarChart, PieChart, ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

function PollAnswered(props) {
  const polls = props.polls;
  const dic = props.dic;
  const list = [blue1, blue2, blue3, blue4, blue3, blue2, blue1];

  return (
    <View style={{width: win.width, padding: 20}}>
    {polls.map((item) => {
      var arr = [];
      for (var i = 0; i < dic[item.title][0].length; i++) {
        var percent = dic[item.title][0][i];
        arr.push([<Text style={{fontSize: 17, color: list[i]}}>{item.choices[i]} ({percent}%)</Text>, <View style={{borderRadius: 50, width: percent + '%', backgroundColor: list[i]}}><Text style={{color: list[i]}}>.</Text></View>]);
      }

      return (
        <View key={item.id} style={[sharedStyles.poll, {width: '100%'}]}>
          <View style={{flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 5, justifyContent: 'space-between'}}>
            <View style={{height: 15, width: 15, backgroundColor: green, borderRadius: 50}}></View>
            <Text style={{fontFamily: 'hn-bold', fontSize: 18, marginLeft: 10, marginRight: 10}}>{item.title}</Text>
            <View></View>
          </View>

          <View style={{backgroundColor: 'transparent', flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
            <View style={{marginRight: '3%', backgroundColor: 'transparent', width: '20%'}}>
            <PieChart data={dic[item.title][1]} width={win.width * 0.20} height={win.width * 0.20} hasLegend={false}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                  margin: 0
                }
              }} accessor="population" backgroundColor="transparent" paddingLeft="12"
            />
            </View>
            <View style={{backgroundColor: 'transparent', width: '75%'}}>
              <View key={i} style={{backgroundColor: 'transparent', flexDirection: 'row', width: '100%'}}>
                <Table borderStyle={{borderWidth: 0, borderColor: 'gray'}} style={{width: '100%', minHeight: 20}}>
                  <Rows data={arr} flexArr={[1, 1]}/>
                </Table>
              </View>
            </View>
          </View>
        </View>
      );
    })}
    </View>
  );
}

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
  }, []);

  return (
    <View style={[sharedStyles.container, {padding: 0}]}>
      <Image source={require('../assets/images/Title.png')} style={sharedStyles.topImage} />

      <ScrollView style={{paddingTop: 5}}>
      {scrollView}
      </ScrollView>
    </View>
  );
}
