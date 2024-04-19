import React, { Component } from "react";
import {
    Text,
    View,
    Image, 
    TouchableOpacity
} from "react-native";
import { colors, fontSizes, icons } from "../constants";
import { Spacing } from "../utilies/Device";

function UIHeader(props) {
    const {
        title,
        rightIconName,
        onPressLeftIcon
    } = props
    const { navigate, goBack } = props.navigation
    return <View style={{
        height: 55,
        backgroundColor: "white",
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center", 
        // marginBottom: Spacing 
        // elevation: 5
    }}>
        <TouchableOpacity 
            onPress={() => goBack()}>
            <Image 
                source={icons.back}
                style={{
                    width: Spacing * 2, height: Spacing * 2,
                    tintColor: colors.main,
                    margin: 10
                }}
                />            
        </TouchableOpacity>

        <Text style={{
            fontSize: fontSizes.h5,
            alignSelf: 'center',
            lineHeight: 45,
            color: colors.main,
            fontFamily: 'Poppins-Medium',
            marginLeft: Spacing / 2
        }}>{title}</Text>
        
        {rightIconName != undefined ? <Image source={rightIconName}
            style={{
                width: 24, height: 24,
                tintColor: colors.main,
                margin: 10
            }}/> : <View style={{width: 24, height: 24, backgroundColor: 'white', margin: 10}}/> }
    </View>
}
export default UIHeader