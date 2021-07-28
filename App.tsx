import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import FirstScreen from './screens/FirstScreen';
import NavigationController from './screens/NavigationController';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [first, setFirst] = useState(false);

  useEffect(() => {
    const makeRequest = async () => {
      AsyncStorage.getItem('firsttime').then((item) => {
        if (item) {
          setFirst(true);
        } else {
          setFirst(false);
        }
      })
    }
    makeRequest();
  }, [])

  if (first) {
    return (
      <NavigationController />
    );
  } else {
    return (
      <FirstScreen />
    );
  }
}
