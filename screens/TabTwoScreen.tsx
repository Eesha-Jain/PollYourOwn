import * as React from 'react';
import { Image, AsyncStorage, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import storage from "@react-native-async-storage/async-storage";
import sharedStyles from '../styles/SharedStyles.ts';

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <View style={sharedStyles.container}>
        <Image source={require('../assets/images/Title.png')} style={sharedStyles.topImage} />
      </View>
    </ScrollView>
  );
}
