/**
 * @format
 */
import React from 'react'
import { AppRegistry } from 'react-native'
import {name as appName} from './app.json'
import {FoodList, 
        Login, 
        Messages, 
        Register, 
        Welcome} from './screens'
import UITab from './navigation/UITab'
import 'react-native-gesture-handler';
import App from './navigation/App'
let fakedProduts = [
    {
        productName: 'ip3',
        year: 2013
    },
    {
        productName: 'ip4',
        year: 2014
    }, 
    {
        productName: 'ip5',
        year: 2015
    },  
]

// AppRegistry.registerComponent(appName, () => () => <WelcomeScreen 
//                                                     x={1} y={2}
//                                                     person = {{
//                                                         name: 'Nguyen Vy Thao',
//                                                         age: 21,
//                                                         email: 'thaonguyenvy109@gmail.com'
//                                                     }}
//                                                     products={fakedProduts}
//                                                     />);

AppRegistry.registerComponent(appName, () => () => <App/>)      