import * as React from 'react';
import { StyleSheet, Image, AsyncStorage, Button, Dimensions } from 'react-native';
const win = Dimensions.get('window');

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';

export default function FirstScreen() {
  function navigateToTabs() {
      navigation.navigate("Tabs");
  }

  return (
    <View>
      <View style={styles.container}>
        <Text>Welcome To</Text>
        <Image source={require('../assets/images/FirstScreenImage.png')} style={styles.topImage} />
        <Text>Create polls anonymously for your community to answer! Get a completely random sample of data!</Text>
        <Button title="Start Now!" onPress={() => navigateToTabs()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  topImage: {
    width: win.width,
    height: win.width * (594 / 678)
  }
});
