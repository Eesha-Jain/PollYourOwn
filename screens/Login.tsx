import * as React from 'react';
import { Image, AsyncStorage, ScrollView, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import sharedStyles from '../styles/SharedStyles.ts';

export default function Login() {
  return (
    <View style={sharedStyles.container}>
      <Image source={require('../assets/images/icon.png')}/>

      <TextInput
        placeholder="username"
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  );
}
