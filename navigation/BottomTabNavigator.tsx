/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, FontAwesome5 ,MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabFourScreen from '../screens/Settings';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Answer"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 size={30} style={{ marginBottom: -3 }} name="poll" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Answered"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons size={30} style={{ marginBottom: -3 }} name="checkmark-done-circle-sharp" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Make"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} name="pencil-box" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Settings"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons size={30} style={{ marginBottom: -3 }} name="md-settings-sharp" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} name="ios-code" color={color} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="One"
        component={TabOneScreen}
        options={{ headerTitle: 'Answer', headerShown:false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Two"
        component={TabTwoScreen}
        options={{ headerTitle: 'Answered', headerShown:false }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Three"
        component={TabThreeScreen}
        options={{ headerTitle: 'Make', headerShown:false }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="Four"
        component={TabFourScreen}
        options={{ headerTitle: 'Make', headerShown:false }}
      />
    </TabFourStack.Navigator>
  );
}
