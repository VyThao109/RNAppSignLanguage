import React from "react"
import {FoodList, Messages} from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {fontSizes, colors, icons} from '../constants'

const Tab = createBottomTabNavigator()
function UITab(props){
 return <Tab.Navigator>
    <Tab.Screen name={"FoodList"} component={FoodList}/>
    <Tab.Screen name={"Messages"} component={Messages}/>
 </Tab.Navigator>
}
export default UITab