import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
    Keyboard
} from 'react-native'
import { colors, icons, fontSizes } from '../../../constants';
import UIHeader from '../../../components/UIHeader';
import ChatItem from './ChatItem';

function Chat(props) {
    const [typedText, setTypeText] = useState('')
    const [chatHistory, setChatHistory] = useState([
        {
            isSender: false,
            messageContent: "shownnnn",
            timestamp: 1710667889000
        },
        {
            isSender: true,
            messageContent: "How are you?",
            timestamp: 1710667949000,
        },
        {
            isSender: true,
            messageContent: "How about your work???????????????????????????????????????????????????????????????????????????????????",
            timestamp: 1710668129000,
        },
        {
            isSender: false,
            messageContent: "Yes!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            timestamp: 1710668429000,
        },
        {
            isSender: false,
            messageContent: "I'm fine",
            timestamp: 1710668489000,
        },
        {
            isSender: true,
            messageContent: "Let's go out",
            timestamp: 1710668729000,
        },
        {
            isSender: true,
            messageContent: "Let's go out 1",
            timestamp: 1710668729000,
        },
        {
            isSender: true,
            messageContent: "Let's go out 2",
            timestamp: 1710668729000,
        },
        {
            isSender: false,
            messageContent: "Ready 3",
            timestamp: 1710668729000,
        },
        {
            isSender: true,
            messageContent: "Let's go out 4",
            timestamp: 1710668729000,
        },
        {
            isSender: true,
            messageContent: "Let's go out 5",
            timestamp: 1710668729000,
        },
        {
            isSender: true,
            messageContent: "Let's go out 6",
            timestamp: 1710668729000,
        },
        {
            isSender: true,
            messageContent: "Let's go out 7",
            timestamp: 1710668729000,
        },
        {
            isSender: true,
            messageContent: "Let's go out 8",
            timestamp: 1710668729000,
        },

    ])
    const [keyboardIsShown, setkeyboardIsShown] = useState(false)
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setkeyboardIsShown(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setkeyboardIsShown(false)
        })
    })
    return <View style={{
        backgroundColor: 'white',
        flex: 1
    }}>
        <UIHeader
            title={"Messages"}
            rightIconName={undefined}
            onPressLeftIcon={() => {
                alert('press left icon')
            }}
        />
        <FlatList style={{
            flex: 1,
            backgroundColor: colors.backroundChat,
        }}
            data={chatHistory}
            inverted //inverted to true, the FlatList will automatically display the most recent chat messages at the bottom, just like in a chat application
            contentContainerStyle={{ flexDirection: 'column-reverse' }}
            renderItem={({ item }) => <ChatItem
                onPress={() => {
                    alert(`You press item's name: ${item.timestamp}`)
                }}
                item={item} 
                key={`item.timestamp`} />}
        />
        <View style={{
            height: 50,
            backgroundColor: 'white',
            marginHorizontal: 8,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <TextInput
                onChangeText={(typedText) => {
                    setTypeText(typedText)
                }}
                style={{
                    // borderBottomWidth: 1.25,
                    // borderBottomColor: colors.main,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    fontSize: fontSizes.h6,
                    alignSelf: 'center',
                    flex: 1
                }}
                placeholder='Text message'
                placeholderTextColor={colors.placeholder}
                value={typedText}>
            </TextInput>
            <TouchableOpacity
                onPress={() => {
                    if (typedText.trim().length == 0)
                        return
                    let newMessageObject = {
                        isSender: true,
                        messageContent: typedText,
                        timestamp: (new Date()).getTime(),
                    }
                }}>
                <Image
                    source={icons.send}
                    style={{
                        width: 22, height: 22,
                        tintColor: colors.main,
                        margin: 10,
                    }}
                />
            </TouchableOpacity>

        </View>
    </View>
}
export default Chat