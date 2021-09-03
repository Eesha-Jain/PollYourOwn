import * as React from 'react';
import { Image, AsyncStorage, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
const win = Dimensions.get('window');
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import storage from "@react-native-async-storage/async-storage";
import { firebase } from '../util/firebaseInit.js';
import sharedStyles from '../styles/SharedStyles.ts';
import { blue1, blue2, blue3, blue4, green, red, gray, white, list } from '../util/colors.ts';
import { PieChart } from 'react-native-chart-kit';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export function PollAnsweredNormal(props) {
  const polls = props.polls;
  const dic = props.dic;

  async function editPoll(id) {
    await firebase.firestore().collection('polls').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const entity = doc.data();
        if (entity.id == id) {
          props.navigate("Create Poll", {
            names: entity.title,
            multis: entity.multiResponses,
            choicess: entity.choices,
            responsess: entity.responses,
            messages: "",
            editings: entity.responseEdit,
            exists: true,
            id: entity.id
          });
        }
      });
    });
  }

  return (
    <View style={{width: win.width, padding: 20}}>
    {polls.map((item) => {
      var arr = [];
      var display = "none";

      for (var i = 0; i < dic[item.title][0].length; i++) {
        var percent = dic[item.title][0][i];
        if (percent != 0) {
          display = "flex";
        }
        arr.push([<Text style={{fontSize: 17, color: list[i]}}>{item.choices[i]} ({percent}%)</Text>, <View style={{borderRadius: 50, width: percent + '%', backgroundColor: list[i]}}><Text style={{color: list[i]}}>.</Text></View>]);
      }

      return (
        <View key={item.id} style={[sharedStyles.poll]}>
          <View style={{flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 5, justifyContent: 'space-between'}}>
            <View style={{height: 15, width: 15, backgroundColor: green, borderRadius: 50}}></View>
            <Text style={{fontFamily: 'hn-bold', fontSize: 18, marginLeft: 10, marginRight: 10}}>{item.title}</Text>
            <TouchableOpacity onPress={() => {editPoll(item.id)}}><Image source={require('../assets/images/additions/Pencil.png')} /></TouchableOpacity>
          </View>

          <View style={{backgroundColor: 'transparent', flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
            <View style={{marginRight: '3%', backgroundColor: 'transparent', width: '20%'}}>
            <PieChart data={dic[item.title][1]} width={win.width * 0.20} height={win.width * 0.20} hasLegend={false}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                  margin: 0
                }
              }} accessor="population" backgroundColor="transparent" paddingLeft="12"
            />
            </View>
            <View style={{backgroundColor: 'transparent', width: '75%'}}>
              <View key={i} style={{backgroundColor: 'transparent', flexDirection: 'row', width: '100%'}}>
                <Table borderStyle={{borderWidth: 0, borderColor: 'gray'}} style={{width: '100%', minHeight: 20}}>
                  <Rows data={arr} flexArr={[1, 1]}/>
                </Table>
              </View>
            </View>
          </View>
        </View>
      );
    })}
    </View>
  );
}

export function PollAnswered(props) {
  const polls = props.polls;
  const dic = props.dic;

  return (
    <View style={{width: win.width, padding: 20}}>
    {polls.map((item) => {
      var arr = [];
      for (var i = 0; i < dic[item.title][0].length; i++) {
        var percent = dic[item.title][0][i];
        arr.push([<Text style={{fontSize: 17, color: list[i]}}>{item.choices[i]} ({percent}%)</Text>, <View style={{borderRadius: 50, width: percent + '%', backgroundColor: list[i]}}><Text style={{color: list[i]}}>.</Text></View>]);
      }

      return (
        <View key={item.id} style={[sharedStyles.poll, {width: '100%'}]}>
          <View style={{flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 5, justifyContent: 'space-between'}}>
            <View style={{height: 15, width: 15, backgroundColor: green, borderRadius: 50}}></View>
            <Text style={{fontFamily: 'hn-bold', fontSize: 18, marginLeft: 10, marginRight: 10}}>{item.title}</Text>
            <View></View>
          </View>

          <View style={{backgroundColor: 'transparent', flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
            <View style={{marginRight: '3%', backgroundColor: 'transparent', width: '20%'}}>
            <PieChart data={dic[item.title][1]} width={win.width * 0.20} height={win.width * 0.20} hasLegend={false}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                  margin: 0
                }
              }} accessor="population" backgroundColor="transparent" paddingLeft="12"
            />
            </View>
            <View style={{backgroundColor: 'transparent', width: '75%'}}>
              <View key={i} style={{backgroundColor: 'transparent', flexDirection: 'row', width: '100%'}}>
                <Table borderStyle={{borderWidth: 0, borderColor: 'gray'}} style={{width: '100%', minHeight: 20}}>
                  <Rows data={arr} flexArr={[1, 1]}/>
                </Table>
              </View>
            </View>
          </View>
        </View>
      );
    })}
    </View>
  );
}
