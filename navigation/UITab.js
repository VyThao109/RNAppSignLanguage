import React, { useState, useEffect, useRef } from "react"
import { Chat, FoodList, Messages } from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Search from "../screens/signLanguageSrc/Search"
import Account from "../screens/signLanguageSrc/Account"


import { images, colors, icons, fontSizes } from '../constants'
import {
   Image,
   Keyboard
} from 'react-native'
const Tab = createBottomTabNavigator()

const screenOptions = ({ route }) => ({
   headerShown: false,
   tabBarHideOnKeyboard: true,
   tabBarShowLabel: false,
   tabBarActiveTintColor: colors.main,
   tabBarInActiveTintColor: colors.inactive,
   // tabBarStyle: {
   //    backgroundColor: colors.main,
   //  },
   tabBarIcon: ({ focused, color, size }) => {
      let screenName = route.name
      const iconName = screenName == "Chat" ? icons.communicateSign :
         (screenName == "Search" ? icons.search : icons.account)
      return <Image source={iconName}
         style={{
            width: 22, height: 22,
            tintColor: (focused ? colors.main : colors.inactive)
         }}>
      </Image>
   },
})
function UITab(props) {
   return <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={"Chat"}
                  component={Chat}
                  options={{
                  tabBarLabel: 'Messages'
                  }} />
      <Tab.Screen name={"Search"} component={Search} />
      <Tab.Screen name={"Account"}
                  component={Account}
      />
   </Tab.Navigator> 
}
export default UITab