import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from "react-native"
import { images, colors, icons, fontSizes } from '../../constants'
import { screenHeight, screenWidth, Spacing } from '../../utilies/Device';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isValidEmail, isValidPassword } from '../../utilies/Validations'
import { auth } from "../../config";
function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [errorEmail, setErrorEmail] = useState(' ')
    const [errorPassword, setErrorPassword] = useState(' ')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const isValidationOK = () => email.length > 0 && password.length > 0 && confirmPassword.length > 0  
                                                && isValidEmail(email) == true && isValidPassword(password) == true 
       

    const onRegister = () => {
        if(password !== confirmPassword) {
            Alert.alert('Password confirmation does not match the password.')
            return Promise.resolve(false)
        }
        return auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('User\'s account created!')
                return true
            }).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('This email already exists. \nPlease use a different email address!')
                }
                else {
                    console.log(`${error}`)
                }
                return Promise.resolve(false)
            })
    }

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
                        height: screenHeight / 12,
                        alignSelf: 'flex-end'
                    }}
                    resizeMode='cover' />
                <TouchableWithoutFeedback>
                    <View style={{
                        margin: Spacing,
                        padding: Spacing,
                        backgroundColor: 'white',
                        height: screenHeight * 0.7,
                        borderRadius: Spacing,
                        justifyContent: 'center',
                        elevation: 20
                    }}>
                        <View style={{
                            marginHorizontal: Spacing
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
                                        position: 'relative',
                                        marginTop: -Spacing * 3
                                    }}
                                    resizeMode='cover' />
                                <Text style={{
                                    fontSize: fontSizes.h1,
                                    color: colors.main,
                                    fontFamily: 'Poppins-Bold',
                                    marginTop: Spacing / 2
                                }}>Create an account</Text>
                            </View>
                            <View style={{
                                marginTop: Spacing * 2,
                                marginVertical: Spacing
                            }}>
                                <Text style={{
                                    color: 'red',
                                    fontSize: fontSizes.h7,
                                    fontFamily: 'Poppins-Regular',
                                    marginStart: Spacing * 0.5,
                                }}>{errorEmail}</Text>
                                <TextInput
                                    value={email}
                                    placeholder='Email'
                                    placeholderTextColor={colors.placeholder}
                                    style={{
                                        color: 'black',
                                        fontSize: fontSizes.h6,
                                        fontFamily: 'Poppins-Regular',
                                        backgroundColor: colors.lightPrimary,
                                        padding: Spacing * 2 / 3,
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
                                <Text style={{
                                    color: 'red',
                                    fontSize: fontSizes.h7,
                                    fontFamily: 'Poppins-Regular',
                                    marginStart: Spacing * 0.5,
                                    marginTop: Spacing
                                }}>{errorPassword}</Text>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <TextInput
                                        placeholder='Password'
                                        value={password}
                                        placeholderTextColor={colors.placeholder}
                                        secureTextEntry = {!showPassword}
                                        style={{
                                            color: 'black',
                                            width: '100%',
                                            fontSize: fontSizes.h6,
                                            fontFamily: 'Poppins-Regular',
                                            backgroundColor: colors.lightPrimary,
                                            padding: Spacing * 2 / 3,
                                            borderRadius: Spacing / 2,
                                            position: 'relative'
                                        }}
                                        onChangeText={(text) => {
                                            if (isValidPassword(text) == false) {
                                                setErrorPassword('Password should be at least 6 characters')
                                            }
                                            else {
                                                setErrorPassword(' ')
                                            }
                                            setPassword(text)
                                        }} />
                                    <TouchableOpacity
                                        onPress={toggleShowPassword}
                                        style={{
                                            top: Spacing / 2,
                                            right: Spacing * 3.5,
                                            alignSelf: 'center'
                                        }}>
                                        <Image
                                            source={showPassword ? icons.showPass : icons.hidePass}
                                            style={{
                                                width: Spacing * 2.5,
                                                height: Spacing * 2.5,
                                                alignContent: 'center',
                                                tintColor: colors.main
                                            }} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={{
                                    color: 'red',
                                    fontSize: fontSizes.h7,
                                    fontFamily: 'Poppins-Regular',
                                    marginStart: Spacing * 0.5,
                                }}> </Text>

                                
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <TextInput
                                        value={confirmPassword}
                                        placeholder='Confirm password'
                                        placeholderTextColor={colors.placeholder}
                                        secureTextEntry ={!showConfirmPassword}
                                        style={{
                                            width: '100%',
                                            color: 'black',
                                            fontSize: fontSizes.h6,
                                            fontFamily: 'Poppins-Regular',
                                            backgroundColor: colors.lightPrimary,
                                            padding: Spacing * 2 / 3,
                                            marginTop: Spacing,
                                            borderRadius: Spacing / 2
                                        }}
                                        onChangeText={(text) => {
                                            setConfirmPassword(text)//meant: gan email = text   
                                        }} />
                                        <TouchableOpacity 
                                            onPress={toggleShowConfirmPassword}
                                            style={{
                                                top: Spacing / 2,
                                                right: Spacing * 3.5,
                                                alignSelf: 'center',
                                        }}>
                                        <Image 
                                            source={showConfirmPassword ? icons.showPass : icons.hidePass}
                                            style={{
                                                width: Spacing * 2.5, 
                                                height: Spacing * 2.5, 
                                                alignContent: 'center',
                                                tintColor: colors.main
                                            }}/>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <TouchableOpacity
                                disabled={isValidationOK() == false}
                                onPress={() => { 
                                    onRegister().then(success => {
                                        if (success) {
                                            navigate('Login');
                                        }
                                    });
                                }}
                                // onPress={onRegister}
                                style={{
                                    backgroundColor: isValidationOK() == true ? colors.primary : colors.lightBackground,
                                    padding: Spacing * 0.8,
                                    marginTop: Spacing * 5,
                                    borderRadius: Spacing / 2,
                                    shadowColor: colors.primary,
                                    elevation: 5
                                }}>
                                <Text style={{
                                    fontSize: fontSizes.h6,
                                    fontFamily: 'Poppins-SemiBold',
                                    textAlign: 'center',
                                    color: 'white',
                                }}>Sign Up</Text>
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
                                }}>Already have an account?</Text>
                                <TouchableOpacity
                                    //disabled = {isValidationOK() == false}
                                    onPress={() => navigate('Login')}
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
                                    }}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ScrollView>
    </KeyboardAvoidingView>
}
export default Register