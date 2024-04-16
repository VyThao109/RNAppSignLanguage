import React, { Component, useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import 'react-native-gesture-handler'
import { Login, Register } from '../screens'
import UITab from "./UITab";
import SplashScreen from "react-native-splash-screen";
const Stack = createNativeStackNavigator()
function App(props) {
  useEffect(() => {
    SplashScreen.hide()
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UITab" component={UITab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App