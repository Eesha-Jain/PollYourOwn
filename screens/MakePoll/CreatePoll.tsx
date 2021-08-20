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
import { blue1, blue2, blue3, blue4, green, red, gray, white, darkgray } from '../../util/colors.ts';
import Toast from 'react-native-root-toast';

export default function CreatePoll({ navigation: { navigate } }) {
  const [name, setName] = useState("");
  const [multi, setMulti] = useState(false);
  const [choices, setChoices] = useState([""]);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  function choicesCustomSet(i, val) {
    var dup = [...choices]
    dup[i] = val;
    setChoices(dup);
  }

  function getChoices(i) {
    return choices[i];
  }

  function add() {
    if (choices.length == 8) {
      setMessage("You can only put up to 8 choices");
      return;
    }

    setChoices([...choices, ""]);
  }

  function deletePoll(index) {
    if (choices.length == 1) {
      setMessage("You must have at least one choice");
      return;
    }
    setMessage("");
    var newChoices = [];
    for (var i = 0; i < choices.length; i++) {
      if (i != index) {
        newChoices.push(choices[i]);
      }
    }

    setChoices(newChoices);
  }

  function publishPoll() {
    if (name == "") {
      setMessage("Please type in a title");
    } else {
      var responses = [];
      for (var i = 0; i < choices.length; i++) {
        if (choices[i] == "") {
          setMessage("Please fill out all choices");
          return;
        }
        responses.push(0);
      }

      const pollsRef = firebase.firestore().collection('polls');
      var id = db.collection("polls").document().getId();
      var data = {
        id: id,
        title: name,
        choices: choices,
        responses: responses,
        multiResponses: multi,
        responseEdit: editing,
        publish: true
      };

      await pollsRef.doc(id).set(data).then(async function () {
          await storage.setItem('user', JSON.stringify(data));
          let toast = Toast.show('Successfully Created Poll', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: false,
            animation: true,
            hideOnPress: true,
            backgroundColor: 'white',
            textColor: 'black',
            opacity: 0.5
          });

          navigate("Back");
      }).catch((error) => {
          changeMessage("ERROR: " + error.message);
      });
    }
  }

  const shape = {
    true: <View key={0} style={{width: 15, height: 15, marginRight: 10, borderWidth: 1, backgroundColor: 'transparent', borderColor: blue1}}></View>,
    false: <View key={1} style={{width: 15, height: 15, marginRight: 10, borderRadius: 15/2, backgroundColor: 'transparent', borderWidth: 1, borderColor: blue1}}></View>
  }

  return (
    <View style={[sharedStyles.container, {padding: 0, width: win.width}]}>
      <ScrollView style={{width: win.width}}>
        <View style={{padding: 20}}>
          <View style={{backgroundColor: gray, padding: 10, borderRadius: 20, width: '100%', marginBottom: 10}}>
            <TextInput style={sharedStyles.input} placeholder="Question" onChangeText={setName} value={name} multiline={false} maxLength={30} />

            <View style={{backgroundColor: 'transparent'}}>
              {choices.map((value, i) => {
                return (
                  <View key={i} style={{flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center', marginBottom: 10}}>
                    <TouchableOpacity onPress={() => {deletePoll(i);}}>{shape[multi]}</TouchableOpacity>
                    <TextInput style={{backgroundColor: white, padding: 5, fontFamily: 'hn-light'}} placeholder="Type option here..." onChangeText={(val) => {choicesCustomSet(i, val)}} value={getChoices(i)} multiline={false} maxLength={20} />
                  </View>
                );
              })}

              <TouchableOpacity onPress={() => {add();}} style={{marginTop: 5, marginBottom: 5}}><Text style={{color: darkgray}}>+add option</Text></TouchableOpacity>

              <Text style={{marginBottom: 5}}>--</Text>

              <Text style={{color: multi ? blue1 : darkgray, marginBottom: 5}}>Allow Multiple Poll Responses</Text>
              <Switch trackColor={{ false: white, true: white }} thumbColor={multi ? blue1 : darkgray} ios_backgroundColor="transparent" onValueChange={setMulti} value={multi} />

              <Text style={{color: editing ? blue1 : darkgray, marginBottom: 5}}>Allow Response Editing After Submit</Text>
              <Switch trackColor={{ false: white, true: white }} thumbColor={editing ? blue1 : darkgray} ios_backgroundColor="transparent" onValueChange={setEditing} value={editing} />
            </View>

            <View style={{backgroundColor: 'transparent', alignItems: 'center'}}>
              <TouchableOpacity style={{marginTop: 20, width: '90%', backgroundColor: blue1, padding: 10, borderRadius: 50}}><Text style={{color: white, textAlign: 'center'}} onPress={() => {publishPoll()}}>Publish Poll</Text></TouchableOpacity>
              <Text style={{color: red, marginTop: 10}}>{message}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
