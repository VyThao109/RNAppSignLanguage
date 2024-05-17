import React, { useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
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
import { db, firebaseDatabase } from "../../config";
import { onValue, ref, remove, set } from "firebase/database";

function Messages(props) {
    const [typedText, setTypedText] = useState('');
    const [messages, setMessages] = useState([]);
    const [onCamera, setOnCamera] = useState(false)
    const [messageFB, setMessageFB] = useState([])
    const [urlStream, setUrlStream] = useState('youtube.com')
    const scrollViewRef = useRef();
    const scrollViewMsgRef = useRef();
    useEffect(() => {
        const startCountRef = ref(firebaseDatabase, 'Messages/');
        const startCountRefIP = ref(firebaseDatabase, 'IP/');
        onValue(startCountRef, (snapshot) => {
            const data = snapshot.val();
            const newPosts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            // Sử dụng map để lấy các giá trị Content
            const contentArray = newPosts.map(newPost => newPost.Content);

            // Ghép các giá trị Content thành một chuỗi sử dụng join
            const Result = contentArray.join('\n');

            // console.log(Result);
            //console.log(newPosts);
            if(Result.trim().length > 0) {
                setMessageFB(Result);
                if (scrollViewMsgRef.current) {
                    scrollViewMsgRef.current.scrollToEnd({ animated: true });
                }                
            }
        });
        onValue(startCountRefIP, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            setUrlStream(data);
        });
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            scrollViewMsgRef.current.scrollToEnd({ animated: true });
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
        setMessages([...messages, newMessageObject]);
        setTypedText('');
    };
    // useEffect(() => {
    //     if (scrollViewRef.current) {
    //         scrollViewRef.current.scrollToEnd({ animated: true });
    //     }
    // }, [messageFB]);
    const handleContentSizeChange = (contentWidth, contentHigh) => {
        scrollViewRef.current.scrollToEnd({ animated: true })
    }
    const clearMessages = () => {
        const messagesRef = ref(firebaseDatabase, 'Messages/');
        set(messagesRef, 'clear').then(() => {
            setMessageFB(''); // Clear local state
        }).catch((error) => {
            console.error("Error clearing messages: ", error);
        });
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
            {!onCamera ? (<TouchableOpacity
                onPress={() => setOnCamera(!onCamera)}
                style={{
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
            </TouchableOpacity>)
            : (
                <>
                    <WebView
                    source={{ uri: urlStream }}
                    style={{ marginTop: 20 }}
                    /> 
                    <TouchableOpacity
                        onPress={() => setOnCamera(!onCamera)}
                        style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'transparent'
                        }}>
                        {/* <Text style={{ fontSize: 30, color: '#686868' }}>Close</Text> */}
                        <Image
                            source={icons.cancel}
                            style={{
                                width: Spacing * 2,
                                height: Spacing * 2,
                                alignSelf: 'flex-end',
                                tintColor: '#BD2F33',
                                top: -Spacing
                            }} /> 
                    </TouchableOpacity>
                </>
            ) }
            
        </View>
        <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
            onContentSizeChange={handleContentSizeChange}>
            {/* AI */}
            <View style={{ height: screenHeight / 4.5, width: '100%' }}>
                {/* Close Button */}
                <TouchableOpacity
                    onPress={() => clearMessages()}
                    style={{
                    position: 'absolute',
                    top: 10,
                    right: 20,
                    zIndex: 1,
                    backgroundColor: 'transparent',
                    marginTop: Spacing
                }}>
                    <Text style={{ 
                        fontSize: 15, 
                        color: colors.main, 
                        backgroundColor: colors.lightMain, 
                        paddingHorizontal: Spacing ,
                        paddingVertical: Spacing / 2, 
                        borderRadius: Spacing / 2,}}>Clear</Text>
                </TouchableOpacity>
                <ScrollView
                    ref={scrollViewMsgRef}
                    style={{
                        margin: Spacing,
                        backgroundColor: colors.main,
                        borderRadius: Spacing,
                        elevation: Spacing * 2
                    }}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        paddingBottom: Spacing / 2
                    }}
                    onContentSizeChange={handleContentSizeChange}>
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
                    }}>{messageFB}</Text>
                </ScrollView>
            </View>
            {/* User */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingHorizontal: Spacing,
                    marginTop: Spacing
                }}>
                <View
                    style={{
                        height: screenHeight / 4.5,
                        width: '100%',
                        backgroundColor: colors.lightInactive,
                        borderRadius: Spacing,
                        elevation: Spacing * 2
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
                        }}>Messages to say: </Text>
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
            </View>
        </ScrollView>

        {/* </KeyboardAvoidingView> */}
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