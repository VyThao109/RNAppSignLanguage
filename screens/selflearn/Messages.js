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
import { colors, fontSizes, icons } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


function Messages(props) {
    return <KeyboardAwareScrollView style={{
        flex: 100,
        backgroundColor: 'rgba(193, 193, 193, 0.1)',
    }}>
        <View style={{
            backgroundColor: 'white',
            flex: 8,
            alignItems: 'center',
            marginHorizontal: 10, 
            flexDirection: 'row'
        }}>
            <TouchableOpacity>
                <Image source={icons.navigationline}
                        style={{
                            width: 20, height: 20,
                            tintColor: colors.main
                        }}/>
            </TouchableOpacity>
            <Text style={{
                fontFamily: 'sans-serif-light',
                fontSize: fontSizes.h4,
                fontWeight: 'bold', 
                color: 'black',
                marginStart: 100,
                alignSelf: 'center'
            }}>Hội thoại</Text>
        </View>

        <View style={{
            // backgroundColor: 'red',
            flex: 58
        }}>
        </View>

        <View style={{
            flex: 28, 
            justifyContent: 'center',
            alignItems: 'center',
            margin: 12,
        }}>
            <View style={{
                backgroundColor: colors.main,
                width: '100%', height: '100%',
                borderRadius: 12,
                elevation: 6,
            }}>
            <Text style={{
                margin: 5
            }}>I SAY SOMETHINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG</Text>
            </View>
        </View>

        <View style={{
            backgroundColor: 'white',
            flex: 6
        }}>
            <TextInput style={{
                borderWidth: 0.5,
                borderRadius: 8, 
                marginHorizontal: 12
            }}>
                
            </TextInput>
        </View>
    </KeyboardAwareScrollView>
}

const styles = StyleSheet.create({
    header: {
        color: 'white', // This sets the color for all Text components
        marginBottom: 7
    }
});
export default Messages