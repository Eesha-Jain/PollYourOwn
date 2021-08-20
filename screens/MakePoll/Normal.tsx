import * as React from 'react';
import { Image, AsyncStorage, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons';
const win = Dimensions.get('window');
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import storage from "@react-native-async-storage/async-storage";
import { firebase } from '../../util/firebaseInit.js';
import sharedStyles from '../../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../../util/colors.ts';

export default function TabThreeScreen({ navigation: { navigate } }) {
  const [blackBack, setBlackBack] = useState({});
  const [display, setDisplay] = useState("");
  const [number, setNumber] = useState(5);

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

          <TouchableOpacity onPress={() => {navigation()}} style={styles.addButton}><Text style={styles.addButtonText}>Create Poll</Text></TouchableOpacity>
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
