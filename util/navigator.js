import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirstScreen from '../screen/FirstScreen';
import NavigationController from '../screen/NavigationController';


const AppStack = createStackNavigator();
export default function Navigator() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}} >
        <AppStack.Screen name="FirstScreen" component={FirstScreen} />
        <AppStack.Screen name="NavigationController" component={NavigationController} />
      <AppStack.Navigator>
    </NavigationContainer>
  );
}
