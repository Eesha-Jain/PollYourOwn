import * as React from 'react';
import { Image, AsyncStorage, StyleSheet, Switch, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons';
const win = Dimensions.get('window');
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import storage from "@react-native-async-storage/async-storage";
import { firebase } from '../../util/firebaseInit.js';
import sharedStyles from '../../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white, darkgray, list } from '../../util/colors.ts';
import { PieChart } from 'react-native-chart-kit';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {PollAnsweredNormal, PollAnswered} from '../../util/PollAnswered';
import { useIsFocused } from "@react-navigation/native";

export default function TabThreeScreen({ navigation: { navigate }, refreshpara}) {
  let [polls, setPolls] = useState([]);
  let [dic, setDic] = useState({});
  const [blackBack, setBlackBack] = useState({});
  const [display, setDisplay] = useState("none");
  const [number, setNumber] = useState(5);
  const [loaded, setLoaded] = useState(false);
  const [normal, setNormal] = useState(<View></View>);
  const isFocused = useIsFocused();
  var refresh = refreshpara || false;

  function navigation() {
    navigate("Create Poll", {
      names: "",
      multis: false,
      choicess: [""],
      responsess: [0],
      messages: "",
      editings: false,
      exists: false,
      id: ""
    });
  }

  const makeRequest = async () => {
    const userUnparsed = await storage.getItem('user');
    const user = JSON.parse(userUnparsed);

    await firebase.firestore().collection('users').doc(user.id).get().then(async function (doc) {
      const entity = doc.data();

      if (entity.pollsAnswered.length < 5) {
        setBlackBack({
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          alignItems: 'center',
          justifyContent: 'center',
          height: win.height
        });
        setNumber(5 - entity.pollsAnswered.length);
      } else {
        setDisplay("flex");
        setBlackBack({
          display: "none"
        })
      }

      if (entity.polls.length == 0) {
        setDisplay("flex");
      } else {
        setDisplay("none");
        let pollsAnswered = entity.polls;
        setPolls([]);
        setDic({});

        for (var i = 0; i < pollsAnswered.length; i++) {
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

        if (!loaded) {setLoaded(true); setNormal(<PollAnsweredNormal key={0} polls={polls} dic={dic} navigate={navigate} />);}
      }
    });
  }

  useEffect(() => {
    if (!refresh) {
      makeRequest();
      refresh = true;
    };
  }, [loaded, normal, isFocused, refresh]);

  return (
    <View>
      <Image source={require('../../assets/images/Title.png')} style={sharedStyles.topImage} />

      <View>
        <View style={[sharedStyles.container, {alignItems: 'center'}]}>
          <View style={[styles.none, {display: display}]}>
            <Entypo name="emoji-sad" size={300} color="rgb(200, 200, 200)" />
            <Text style={{color: 'gray', fontSize: 20}}>You haven't created any polls yet</Text>
          </View>
        </View>

        <ScrollView style={{padding: 5}}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => {navigation()}} style={[styles.addButton, {marginTop: 20, marginBottom: 10}]}><Text style={styles.addButtonText}>Create Poll</Text></TouchableOpacity>
          </View>

          {normal}
        </ScrollView>
      </View>

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
