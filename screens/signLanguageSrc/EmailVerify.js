import React, { useState, useEffect, useRef } from 'react'
import {
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Image
} from 'react-native'
import { UIHeader, UISearchInput } from '../../components';
import { images, colors, icons, fontSizes } from '../../constants'
import { screenHeight, screenWidth, Spacing } from '../../utilies/Device';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isValidEmail } from '../../utilies/Validations'

function EmailVerify(props) {
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(' ')
    const isValidationOK = () => email.length > 0 > 0 && isValidEmail(email) == true

    const { navigation, route } = props
    //functions of navigate to/back
    const { navigate, goBack } = props.navigation
    return <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
            <SafeAreaView style={{
                paddingVertical: Spacing * 3,
                height: screenHeight,
                backgroundColor: 'white'
            }}>
                <View
                    style={{
                        width: screenWidth / 2,
                        height: screenHeight / 7,
                        alignSelf: 'flex-end',
                    }}
                    resizeMode='cover' />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{
                        margin: Spacing,
                        padding: Spacing,
                        backgroundColor: 'white',
                        height: screenHeight * 0.58,
                        borderRadius: Spacing,
                        justifyContent: 'flex-start',
                        elevation: 20,
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => goBack()}>
                                <Image
                                    source={icons.back}
                                    style={{
                                        width: Spacing * 2.5,
                                        height: Spacing * 2.5,
                                        tintColor: colors.main,
                                        marginLeft: Spacing / 2,
                                        top: Spacing * 1.5
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginHorizontal: Spacing,
                        }}>
                            <View style={{
                                alignItems: 'center',
                            }}>
                                <ImageBackground
                                    source={images.logo}
                                    style={{
                                        width: screenWidth * 0.5,
                                        height: screenWidth * 0.24,
                                        alignSelf: 'center',
                                        position: 'relative'
                                    }}
                                    resizeMode='cover' />
                                <Text style={{
                                    fontSize: fontSizes.h1,
                                    color: colors.main,
                                    fontFamily: 'Poppins-Bold',
                                    marginTop: Spacing
                                }}>Email Verification</Text>
                                <Text style={{
                                    paddingTop: Spacing * 0.8,
                                    fontSize: fontSizes.h6,
                                    fontFamily: 'Poppins-Regular',
                                    textAlign: 'center',
                                    width: "85%",
                                    color: colors.inactive,
                                }}>Please enter the new password that send to your email address</Text>
                            </View>
                            <View style={{
                                marginTop: Spacing * 3,
                                marginVertical: Spacing
                            }}>
                                <Text style={{
                                    color: 'red',
                                    fontSize: fontSizes.h7,
                                    fontFamily: 'Poppins-Regular',
                                    marginStart: Spacing * 0.5,
                                }}>{errorEmail}</Text>
                                <TextInput
                                    placeholder='Your new password'
                                    placeholderTextColor={colors.placeholder}
                                    style={{
                                        fontSize: fontSizes.h6,
                                        fontFamily: 'Poppins-Regular',
                                        backgroundColor: colors.lightPrimary,
                                        padding: Spacing * 2 / 3,
                                        marginBottom: Spacing,
                                        borderRadius: Spacing / 2
                                    }}
                                    onChangeText={(text) => {
                                        if (isValidEmail(text) == false) {
                                            setErrorEmail('Email not in correct format')
                                        }
                                        else {
                                            setErrorEmail(' ')
                                        }
                                        setEmail(text)//meant: gan email = text   
                                    }} />
                            </View>
                            <TouchableOpacity
                                disabled={isValidationOK() == false}
                                onPress={() => {
                                    if (isValidAccount()) {
                                        navigate('UITab');
                                    }
                                    else {
                                        alert('Your email or password is not correct')
                                    }
                                }}
                                style={{
                                    backgroundColor: isValidationOK() == true ? colors.primary : colors.lightBackground,
                                    padding: Spacing * 0.8,
                                    marginTop: Spacing,
                                    borderRadius: Spacing / 2,
                                    shadowColor: colors.primary,
                                    elevation: 5
                                }}>
                                <Text style={{
                                    fontSize: fontSizes.h6,
                                    fontFamily: 'Poppins-SemiBold',
                                    textAlign: 'center',
                                    color: 'white',
                                }}>Verify</Text>
                            </TouchableOpacity>
                            
                            <View style={{
                                height: 1, width: '80%',
                                backgroundColor: colors.lightBackground,
                                marginTop: Spacing * 2,
                                alignSelf: 'center'
                            }} />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    paddingVertical: Spacing * 0.8,
                                    marginBottom: Spacing * 2,
                                    fontSize: fontSizes.h7,
                                    fontFamily: 'Poppins-Regular',
                                    textAlign: 'center',
                                    color: colors.inactive,
                                }}>If you don't receive new password!</Text>
                                <TouchableOpacity
                                    onPress={() => navigate('Register')}
                                    style={{
                                        paddingVertical: Spacing * 0.8,
                                        marginBottom: Spacing * 2,
                                        marginStart: Spacing / 5
                                    }}>
                                    <Text style={{
                                        fontSize: fontSizes.h7,
                                        fontFamily: 'Poppins-SemiBold',
                                        textAlign: 'center',
                                        color: colors.primary,
                                    }}>Resend</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ScrollView>
    </KeyboardAvoidingView>
}
export default EmailVerify