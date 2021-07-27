import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import FirstScreen from './screens/FirstScreen';
import NavigationController from './screens/NavigationController';
import storage from "@react-native-async-storage/async-storage";

export default function App() {
  /*useEffect(() => {
    const makeRequest = async () => {
      const var = await storage.getItem('firsttime');
    }
    makeRequest();
  }, [])*/

  return (
    <NavigationController />
  );
}
