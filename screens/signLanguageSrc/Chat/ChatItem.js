import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { colors, fontSizes } from '../../../constants'
import { screenWidth } from '../../../utilies/Device';

function ChatItem(props) {
    const { onPress } = props
    const { isSender, messageContent, timestamp } = props.item
    return (isSender == false ? 
    <TouchableOpacity
        onPress={onPress}
        style={{
            paddingTop: 10,
            paddingStart: 10,
            flexDirection: 'row',
            alignItems: 'center'
        }}>
        <View style={{
            flexDirection: 'row',
            width:  3 * screenWidth / 4,
        }}>
            <Text style={{
                color: 'white',
                fontSize: fontSizes.h6,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: colors.messageReceived,
                borderRadius: 10,
                fontFamily: 'Poppins-Regular',
            }}>{messageContent}</Text>
        </View>
    </TouchableOpacity> : 
    <TouchableOpacity
        onPress={onPress}
        style={{
            paddingTop: 10,
            paddingEnd: 10,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }}>
        <View style={{
            width:  3 * screenWidth / 4,
            flexDirection: 'row',
            justifyContent: 'flex-end'
        }}>
            <Text style={{
                color: 'black',
                fontSize: fontSizes.h6,
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: colors.messageSent,
                borderRadius: 10,
                fontFamily: 'Poppins-Regular',
            }}>{messageContent}</Text>
        </View>
    </TouchableOpacity>
    )
}
export default ChatItem