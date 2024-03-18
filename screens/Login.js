import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity, //thay the cho button
    TextInput,
    KeyboardAvoidingView,
    Keyboard //ngan khi keyboard hien se lam cac component nhay
} from 'react-native'
import { images, colors, icons, fontSizes } from '../constants'
import { isValidEmail, isValidPassword } from '../utilies/Validations'

function Login(props) {
    const [keyboardIsShown, setkeyboardIsShown] = useState(false)
    useEffect(() => {
        //componentDidMount
        Keyboard.addListener('keyboardDidShow', () => {
            setkeyboardIsShown(true)
        })
        Keyboard.addListener('keyboardDidHide', () => {
            setkeyboardIsShown(false)
        })
    })

    //states for validate
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    //states to store email/password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isValidationOK = () => email.length > 0 && password.length > 0
                                && isValidEmail(email) == true
                                && isValidPassword(password) == true

    //navigation
    const {navigation, route} = props
    //functions of navigate to/back
    const{navigate, goBack} = navigation

    return <KeyboardAvoidingView
        behavior=''
        style={{
            flex: 100,
            backgroundColor: 'white'
        }}>
        <View style={{
            flex: 25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <Text style={{
                color: 'black',
                fontSize: fontSizes.h3,
                fontWeight: 'bold',
                width: '50%'
            }}>Already have an Account?</Text>
            <Image source={images.computer}
                style={{
                    height: 100, width: 100,
                    alignSelf: 'center',
                    tintColor: colors.primary
                }}
            ></Image>
        </View>

        <View style={{
            flex: 35
        }}>
            <View style={{
                marginHorizontal: 15,
            }}>
                <Text style={{
                    color: colors.primary,
                    fontSize: fontSizes.h6
                }}>Email:</Text>
                <TextInput
                    onChangeText={(text) => {
                        if (isValidEmail(text) == false) {
                            setErrorEmail('Email not in correct format')
                        }
                        else {
                            setErrorEmail('')
                        }
                        setEmail(text)//meant: gan email = text   
                    }}
                    style={{
                        color: 'black'
                    }}
                    placeholder='example@gmail.com'
                    placeholderTextColor={colors.placeholder} />
                {/* line */}
                <View style={{
                    height: 1, width: '100%',
                    backgroundColor: colors.primary,
                    marginBottom: 10,
                    marginHorizontal: 15,
                    alignSelf: 'center'
                }} />
                <Text style={{
                    color: 'red',
                    fontSize: fontSizes.h6,
                    marginBottom: 10
                }}>{errorEmail}</Text>
            </View>

            <View style={{
                marginHorizontal: 15
            }}>
                <Text style={{
                    color: colors.primary,
                    fontSize: fontSizes.h6
                }}>Password:</Text>
                <TextInput
                    onChangeText={(text) => {
                        if (isValidPassword(text) == false) {
                            setErrorPassword('Password is must be at least 3 characters')
                        }
                        else {
                            setErrorPassword('')
                        }
                        setPassword(text) //meant: gan password = text
                    }}
                    style={{
                        color: 'black'
                    }}
                    placeholder='Enter your password'
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry={true} />
                <View style={{
                    height: 1, width: '100%',
                    backgroundColor: colors.primary,
                    marginBottom: 15,
                    marginHorizontal: 15,
                    alignSelf: 'center'
                }} />
                <Text style={{
                    color: 'red',
                    fontSize: fontSizes.h6,
                    marginBottom: 10
                }}>{errorPassword}</Text>
            </View>
        </View>
        {keyboardIsShown == false && <View style={{
            flex: 28,
        }}>
            <TouchableOpacity
                disabled = {isValidationOK() == false}
                onPress={() => navigate('UITab')}
                style={{
                    backgroundColor: isValidationOK() == true ? colors.primary : colors.inactive,
                    marginHorizontal: 30,
                    marginTop: 30,
                    width: '50%',
                    alignSelf: 'center',
                    borderRadius: 20
                }}>
                <Text style={{
                    alignSelf: 'center',
                    color: 'white',
                    padding: 8,
                    fontSize: fontSizes.h5
                }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => alert('press register')}>
                <Text style={{
                    alignSelf: 'center',
                    color: colors.primary,
                    padding: 8,
                    fontSize: fontSizes.h6
                }}>New user? Register now</Text>
            </TouchableOpacity>
        </View>}

        {keyboardIsShown == false && <View style={{
            flex: 25
        }}>
            <View style={{
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20
            }}>
                <View style={{ height: 1, backgroundColor: 'black', flex: 1 }} />
                <Text style={{
                    alignSelf: 'center',
                    color: 'black',
                    padding: 8,
                    fontSize: fontSizes.h6,
                    marginHorizontal: 5
                }}>Use other methods?</Text>
                <View style={{ height: 1, backgroundColor: 'black', flex: 1 }} />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <Image source={icons.facebook}
                    style={{
                        width: 35, height: 35
                    }}>
                </Image>
                <View style={{ width: 50 }} />
                <Image source={icons.google}
                    style={{
                        width: 35, height: 35,
                        tintColor: colors.google
                    }}>
                </Image>
            </View>
        </View>}
    </KeyboardAvoidingView>
}
export default Login