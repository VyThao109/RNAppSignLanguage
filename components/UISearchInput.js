import React, { Component } from 'react';
import {
    TouchableOpacity,
    TextInput,
    View,
    Image
} from 'react-native'
import { colors, icons, fontSizes } from '../constants';
import { Spacing } from '../utilies/Device';
function UISearchInput(props) {
    const {
        placeHolderText, 
        widthSize
    } = props
    return <View style={{
        flexDirection: 'row',
        paddingHorizontal: Spacing * 0.8,
        paddingVertical: Spacing
    }}>
        <TextInput style={{
            fontFamily: 'Poppins-Regular',
            fontSize: fontSizes.h6,
            backgroundColor: 'white',
            elevation: 5,
            borderRadius: Spacing * 3,
            position: 'relative',
            width: widthSize,
            marginHorizontal: Spacing / 6,
            paddingHorizontal: Spacing * 1.5,
            paddingBottom: Spacing / 2,
        }}
            placeholder={placeHolderText}
            placeholderTextColor={colors.placeholder}
        ></TextInput>
        <TouchableOpacity style={{
            top: Spacing / 10,
            right: Spacing * 5,
            alignSelf: 'center',
        }}>
            <Image
                source={icons.search}
                style={{
                    width: 20, height: 20,
                    tintColor: colors.inactive,
                    margin: 10,
                }} />
        </TouchableOpacity>

        <TouchableOpacity style={{
            top: Spacing / 10,
            right: Spacing  * 4,
        }}>
            <Image
                source={icons.filter}
                style={{
                    width: 26, height: 26,
                    tintColor: colors.main,
                    marginVertical: Spacing,
                    marginRight: Spacing,
                    marginLeft: Spacing / 2,
                }} />
        </TouchableOpacity>
    </View>
}
export default UISearchInput
