import React, { useState, useEffect, useRef } from 'react';
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
    Image,
    Alert
} from 'react-native'
import { images, colors, icons, fontSizes } from '../../constants'
import { screenHeight, screenWidth, Spacing } from '../../utilies/Device';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isValidEmail } from '../../utilies/Validations'
import { auth } from "../../config";

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorEmail, setErrorEmail] = useState(' ')
    const [showPassword, setShowPassword] = useState(false)


    const isValidationOK = () => email.length > 0 && password.length > 0
        && isValidEmail(email) == true
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onLogin = () => {
        return auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                Alert.alert("Login successfully!")
                // console.log('response: ', response)
                // const userID = response.user.uid; // Lấy ID người dùng từ response
                // navigate('UITab', { userID });
                return true
            }).catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    Alert.alert('Email or password is not correct')
                }
                console.log('error: ', error)
                return Promise.resolve(false)
            })
    }

    //navigation
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    return <KeyboardAvoidingView style={{ flex: 1 }}>
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
                        alignSelf: 'flex-end'
                    }}
                    resizeMode='cover' />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{
                        margin: Spacing,
                        padding: Spacing,
                        backgroundColor: 'white',
                        height: screenHeight * 0.58,
                        borderRadius: Spacing,
                        justifyContent: 'center',
                        elevation: 20
                    }}>
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
                                    marginTop: Spacing / 2
                                }}>Welcome back!</Text>
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
                                    placeholder='Email'
                                    value={email}
                                    placeholderTextColor={colors.placeholder}
                                    style={{
                                        fontSize: fontSizes.h6,
                                        color: 'black',
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
                                        setEmail(text)
                                    }} />
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <TextInput
                                        placeholder='Password'
                                        value={password}
                                        placeholderTextColor={colors.placeholder}
                                        secureTextEntry={!showPassword}
                                        style={{
                                            color: 'black',
                                            fontSize: fontSizes.h6,
                                            width: '100%',
                                            fontFamily: 'Poppins-Regular',
                                            backgroundColor: colors.lightPrimary,
                                            padding: Spacing * 2 / 3,
                                            marginTop: Spacing,
                                            borderRadius: Spacing / 2,
                                            position: 'relative'
                                        }}
                                        onChangeText={(text) => {
                                            setPassword(text)
                                        }} />
                                    <TouchableOpacity 
                                        onPress={toggleShowPassword}
                                        style={{
                                            top: Spacing / 2,
                                            right: Spacing * 3.5,
                                            alignSelf: 'center', 
                                        }}>
                                        <Image 
                                            source={showPassword ? icons.showPass : icons.hidePass}
                                            style={{
                                                width: Spacing * 2.5, 
                                                height: Spacing * 2.5, 
                                                alignContent: 'center',
                                                tintColor: colors.main
                                            }}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View>
                                <TouchableOpacity 
                                    onPress={() => navigate('ForgotPass')}>
                                    <Text style={{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: fontSizes.h8,
                                        color: colors.primary,
                                        alignSelf: 'flex-end'
                                    }}>Forgot your password ?</Text>                                    
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity
                                disabled={isValidationOK() == false}
                                onPress={() => { 
                                    onLogin().then(success => {
                                        if (success) {
                                            setEmail('');
                                            setPassword('')
                                            navigate('UITab');
                                        }
                                    });
                                }}
                                style={{
                                    backgroundColor: isValidationOK() == true ? colors.primary : colors.lightBackground,
                                    padding: Spacing * 0.8,
                                    marginTop: Spacing * 3,
                                    borderRadius: Spacing / 2,
                                    shadowColor: colors.primary,
                                    elevation: 5
                                }}>
                                <Text style={{
                                    fontSize: fontSizes.h6,
                                    fontFamily: 'Poppins-SemiBold',
                                    textAlign: 'center',
                                    color: 'white',
                                }}>Sign In</Text>
                            </TouchableOpacity>
                            <View style={{
                                height: 1, width: '80%',
                                backgroundColor: colors.lightBackground,
                                marginTop: Spacing * 3,
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
                                }}>Don't have an account?</Text>
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
                                    }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ScrollView>
    </KeyboardAvoidingView>
}
export default Login