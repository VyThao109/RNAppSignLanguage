import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native'
import { colors, icons, fontSizes } from '../../constants';
import UIHeader from '../../components/UIHeader';
import { Spacing, screenHeight, screenWidth } from '../../utilies/Device';


function Messages(props) {
    const [typedText, setTypedText] = useState('');
    const [messages, setMessages] = useState([]);

    const scrollViewRef = useRef(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            scrollViewRef.current.scrollToEnd({ animated: true });
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);
    const handleSendMessage = () => {
        if (typedText.trim().length === 0) return;

        const newMessageObject = {
            isSender: true,
            messageContent: typedText,
            timestamp: new Date().getTime(),
        };

        // Thêm tin nhắn mới vào danh sách tin nhắn
        setMessages([...messages, newMessageObject]);

        // Xóa nội dung tin nhắn sau khi gửi
        setTypedText('');
    };
    return <View style={{
        backgroundColor: 'white',
        flex: 1
    }}>
        <UIHeader
            navigation={props.navigation}
            title={"Messages"}
            rightIconName={undefined}
            onPressLeftIcon={() => {
                alert('press left icon')
            }}
        />
        <View style={{
            width: '100%',
            height: screenHeight / 3.5
        }}>
            <TouchableOpacity style={{
                backgroundColor: colors.lightInactive,
                width: '100%', height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    source={icons.camera}
                    style={{
                        width: Spacing * 5, height: Spacing * 5,
                        tintColor: colors.inactive,
                    }}
                    resizeMode="contain" />
                <Text style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: fontSizes.h6,
                    color: '#686868'
                }}>Tap to open stream</Text>
            </TouchableOpacity>
        </View>
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior='padding'
            keyboardVerticalOffset={-200}>
            <ScrollView  
                ref={scrollViewRef}
                style={{ flex: 1}}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                contentInsetAdjustmentBehavior="automatic">
            {/* AI */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ height: screenHeight / 4.5, width: '100%'}}>
                    <ScrollView
                        style={{
                            margin: Spacing,
                            backgroundColor: colors.main,
                            borderRadius: Spacing,
                            elevation: Spacing * 2
                        }}
                        contentContainerStyle={{
                            justifyContent: 'flex-start',
                            paddingBottom: Spacing / 2
                        }}>
                        <Text style={{
                            color: colors.lightMain,
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: fontSizes.h6,
                            marginHorizontal: Spacing,
                            marginTop: Spacing
                        }}>Sign language translate: </Text>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'Poppins-Regular',
                            fontSize: fontSizes.h5,
                            marginBottom: Spacing,
                            marginHorizontal: Spacing,
                        }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam felis, finibus a dapibus in, ornare nec sem
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam felis, finibus a dapibus in, ornare nec sem
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam felis, finibus a dapibus in, ornare nec sem
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam felis, finibus a dapibus in, ornare nec sem</Text>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
            {/* User */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingHorizontal: Spacing,
                    marginTop: Spacing
                }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            height: screenHeight / 4.5,
                            width: '100%',
                            backgroundColor: colors.lightInactive,
                            borderRadius: Spacing,
                            elevation: Spacing* 2
                        }}>
                        <ScrollView
                            style={{
                                margin: Spacing,
                            }}
                            contentContainerStyle={{
                                paddingBottom: Spacing / 2,
                            }}>
                                <Text style={{
                                    color: colors.inactive,
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: fontSizes.h6,
                                }}>Message you want to communicate: </Text>
                            <Text
                                style={{
                                    color: 'black',
                                    fontFamily: 'Poppins-Regular',
                                    fontSize: fontSizes.h5,
                                }}>
                                {messages.length > 0 ? messages[messages.length - 1].messageContent : ''}
                            </Text>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </View>                
            </ScrollView>

        </KeyboardAvoidingView>
        <View style={{
            height: 50,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <TextInput
                style={{
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    fontSize: fontSizes.h6,
                    alignSelf: 'center',
                    flex: 1
                }}
                placeholder='Write message'
                placeholderTextColor={colors.placeholder}
                value={typedText}
                onChangeText={setTypedText}
            >
            </TextInput>
            <TouchableOpacity
                onPress={handleSendMessage}
                >
                <Image
                    source={icons.send}
                    style={{
                        width: 25, height: 25,
                        tintColor: colors.main,
                        margin: 10,
                    }}
                />
            </TouchableOpacity>

        </View>
    </View>
}
export default Messages