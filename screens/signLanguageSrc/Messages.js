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
import { db,firebaseDatabase } from "../../config";
import { onValue, ref } from "firebase/database";

function Messages(props) {
    const scrollViewRef = useRef(null);
    const [messageFB, setMessageFB] = useState([])

    useEffect(() => {
        const startCountRef = ref(firebaseDatabase, 'Messages/');
        onValue(startCountRef, (snapshot) => {
            const data = snapshot.val();
            const newPosts = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            // Sử dụng map để lấy các giá trị Content
            const contentArray = newPosts.map(newPost => newPost.Content);

            // Ghép các giá trị Content thành một chuỗi sử dụng join
            const Result = contentArray.join(', ');

            console.log(Result);
            //console.log(newPosts);
            setMessageFB(Result);
        });
        console.log(messageFB);
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            scrollViewRef.current.scrollToEnd({ animated: true });
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);
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
                }}>Tap to open camera</Text>
            </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView  
                ref={scrollViewRef}
                style={{ flex: 1}}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
            {/* AI */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ height: screenHeight / 5, width: screenWidth * 0.9 }}>
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
                        }}>{messageFB}</Text>
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
                            height: screenHeight / 5.1,
                            width: screenWidth * 0.9,
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
                            <Text
                                style={{
                                    color: 'black',
                                    fontFamily: 'Poppins-Regular',
                                    fontSize: fontSizes.h5,
                                }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam felis, finibus a dapibus in, ornare nec sem.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam felis, finibus a dapibus in, ornare nec sem.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam felis, finibus a dapibus in, ornare nec sem.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam felis, finibus a dapibus in, ornare nec sem.
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
                // onChangeText={(typedText) => {
                //     setTypeText(typedText)
                // }}
                style={{
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    fontSize: fontSizes.h6,
                    alignSelf: 'center',
                    flex: 1
                }}
                placeholder='Write message'
                placeholderTextColor={colors.placeholder}
            // value={typedText}
            >
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