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
import {PollAnsweredNormal} from '../../util/PollAnswered';

export default function TabThreeScreen({ navigation: { navigate } }) {
  const [blackBack, setBlackBack] = useState({});
  const [display, setDisplay] = useState("");
  const [number, setNumber] = useState(5);
  let [polls, setPolls] = useState([]);
  let [dict, setDict] = useState({});

  function navigation() {
    navigate("Create Poll");
  }

  useEffect(() => {
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
        }

        if (entity.polls.length == 0) {
          setDisplay("flex");
        } else {
          setDisplay("none");
          var dic = {};
          var pollArr = [];

          for (var i = 0; i < entity.polls.length; i++) {
            let pollsTemp = [];
            await firebase.firestore().collection('polls').where("id", "==", entity.polls[i]).get().then((querySnapshot) => {
              querySnapshot.forEach((poll) => {
                var item = poll.data();
                pollArr.push(item);

                let arr = [];
                var count = 0;
                for (var i = 0; i < item.choices.length; i++) { count += item.responses[i]; }
                for (var i = 0; i < item.choices.length; i++) {
                  try {arr[i] = ((item.responses[i] * 100) / (count)).toFixed(0); }
                  catch (e) { arr[i] = 0; };
                  if (isNaN(arr[i])) arr[i] = 0;
                }

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

          setDict(dic);
          setPolls(pollArr);
        }
      });
    }
    makeRequest();
  }, [])

  return (
    <View>
      <Image source={require('../../assets/images/Title.png')} style={sharedStyles.topImage} />
      <ScrollView>
        <View style={[sharedStyles.container, {alignItems: 'center'}]}>
          <View style={[styles.none, {display: display}]}>
            <Entypo name="emoji-sad" size={300} color="rgb(200, 200, 200)" />
            <Text style={{color: 'gray', fontSize: 20}}>You haven't created any polls yet</Text>
          </View>

          <TouchableOpacity onPress={() => {navigation()}} style={[styles.addButton, {marginTop: 20, marginBottom: 10}]}><Text style={styles.addButtonText}>Create Poll</Text></TouchableOpacity>

          <PollAnsweredNormal polls={polls} dic={dict} />
        </View>
      </ScrollView>

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
