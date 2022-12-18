import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet,Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView,FlatList,} from 'react-native';
import Home from './Home';
import Completed from './Completed'
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHomeLgAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import Store from './src/redux/store'
library.add(faHomeLgAlt, faCheck);


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={Store}>
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false,}}
        >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Completed" component={Completed}/>
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
