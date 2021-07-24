import * as React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View>
      <View style={styles.container}>
        <Image source={require('../assets/images/Title.png')} style={{ width: 600, height: 100}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});
