import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import FirstScreen from './screens/FirstScreen';
import NavigationController from './screens/NavigationController';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [first, setFirst] = useState(false);

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

  let [fontsLoaded] = useFonts({
    'hn-bold': require('./assets/fonts/Bold.otf'),
    'hn-extrabold': require('./assets/fonts/ExtraBold.otf'),
    'hn-hairline': require('./assets/fonts/Hairline.otf'),
    'hn-hairlineitalic': require('./assets/fonts/HairlineItalic.otf'),
    'hn-light': require('./assets/fonts/Light.otf'),
    'hn-medium': require('./assets/fonts/Medium.otf'),
    'hn-regular': require('./assets/fonts/Regular.otf'),
    'hn-semibolditalic': require('./assets/fonts/SemiBoldItalic.otf'),
    'hn-super': require('./assets/fonts/Super.otf'),
    'hn-thin': require('./assets/fonts/Thin.otf'),
    'hn-ultralight': require('./assets/fonts/UltraLight.otf'),
  });

  if (!fontsLoaded) {
      return <AppLoading />;
  } else {
    if (first) {
      return (
        <NavigationContainer>
          <NavigationController />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <SafeAreaProvider>
            <FirstScreen />
            <StatusBar />
          </SafeAreaProvider>
        </NavigationContainer>
      );
    }
  }
}
