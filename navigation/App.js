import React, {Component, useState} from "react";
import {
    SafeAreaView,
    
} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import 'react-native-gesture-handler'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'


import {Welcome, Login, Register} from '../screens'

import UITab from "./UITab";
const Stack = createNativeStackNavigator()
function App(props) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          {/* Corrected placement of component prop */}
          <Stack.Screen name="UITab" component={UITab} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
export default App