import * as React from 'react';
import { StyleSheet, Image, AsyncStorage, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View>
      <View style={styles.container}>
        <Text>Welcome To</Text>
        <Image source={require('../assets/images/FirstScreenImage.png')} style={{ width: 600, height: 600}} />
        <Text>Create polls anonymously for your community to answer! Get a completely random sample of data!</Text>
        <Button title="Start Now!" onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});
