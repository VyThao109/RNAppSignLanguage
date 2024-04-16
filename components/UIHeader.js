import React, { Component } from "react";
import {
    Text,
    View,
    Image, 
    TouchableOpacity
} from "react-native";
import { colors, fontSizes, icons } from "../constants";

function UIHeader(props) {
    const {
        title,
        rightIconName,
        onPressLeftIcon
    } = props
    return <View style={{
        height: 55,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", 
        elevation: 5
    }}>
        <TouchableOpacity 
            onPress={onPressLeftIcon}>
            <Image 
                source={icons.navigationline}
                style={{
                    width: 36, height: 36,
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