import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity, //thay the cho button
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard //ngan khi keyboard hien se lam cac component nhay
} from 'react-native'
import { images, colors, icons, fontSizes } from '../constants'
import { isValidEmail, isValidPassword } from '../utilies/Validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function FoodList(props) {
    //lisy of foods = state
    const[foods, setFoods] = useState([
        {
            name: 'Paedlla Valenciana, with rabbit and chicken; and seafood paella',
            status: 'Opening soon',
            price: 5225.67,
            website: 'https://edition.cnn.com',
            socialNetworks: [
                {twitter: 'https://www.facebook.com/thao.nguyenvy.140'}
            ]
        },
        {
            name: 'Gazpacho',
            status: 'Opening now',
            price: 5212.67,
            website: 'https://edition.cnn.com',
        },
        {
            name: 'Pimientos de Padron',
            status: 'Closing soon',
            price: 322.2,
            website: 'https://edition.cnn.com',
        },
        {
            name: 'Albondigas',
            status: 'Comming soon',
            price: 1000,
            website: 'https://edition.cnn.com',
        },
    ])
    return <View style={{
        flex: 1
    }}>

    </View>
}
export default FoodList