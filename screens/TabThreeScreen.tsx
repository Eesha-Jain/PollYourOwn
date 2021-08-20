import * as React from 'react';
import { Image, AsyncStorage, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import {useState, useEffect} from 'react';
import { Entypo } from '@expo/vector-icons';
const win = Dimensions.get('window');
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import storage from "@react-native-async-storage/async-storage";
import { firebase } from '../util/firebaseInit.js';
import sharedStyles from '../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white } from '../util/colors.ts';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const MiniStack = createStackNavigator();
import Normal from './MakePoll/Normal';
import CreatePoll from './MakePoll/CreatePoll';

export default function TabThreeScreen() {
  return (
    <MiniStack.Navigator initialRouteName="Back">
      <MiniStack.Screen
        name="Back"
        options={{headerShown:false}}
        component={Normal}
      />
      <MiniStack.Screen
        name="Create Poll"
        options={{headerShown:true}}
        component={CreatePoll}
      />
    </MiniStack.Navigator>
  );
}
