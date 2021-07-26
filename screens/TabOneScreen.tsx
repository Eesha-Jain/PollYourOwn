import * as React from 'react';
import { Image, AsyncStorage } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import sharedStyles from '../styles/SharedStyles.ts';

export default function TabOneScreen() {
  return (
    <View>
      <View style={sharedStyles.container}>
        <Image source={require('../assets/images/Title.png')} style={sharedStyles.topImage} />
      </View>
    </View>
  );
}
