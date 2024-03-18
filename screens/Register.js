import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity, //thay the cho button
    TextInput,
    Keyboard //ngan khi keyboard hien se lam cac component nhay
} from 'react-native'
import { images, colors, icons, fontSizes } from '../constants'
import { isValidEmail, isValidPassword } from '../utilies/Validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function Register(props) {
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

    return <View
            style={{
                flex: 100,
                backgroundColor: colors.primary
            }}>
            <View style={{
                flex: 20,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: fontSizes.h3,
                    fontWeight: 'bold',
                    width: '50%'
                }}>Already have an Account?</Text>
                <Image source={images.computer}
                    style={{
                        height: 100, width: 100,
                        alignSelf: 'center',
                        tintColor: 'white'
                    }}
                ></Image>
            </View>

            <View style={{
                flex: 55,
                backgroundColor: 'white',
                padding: 10,
                margin: 10,
                borderRadius: 10
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
                        marginBottom: 5,
                        marginHorizontal: 15,
                        alignSelf: 'center'
                    }} />
                    <Text style={{
                        color: 'red',
                        fontSize: fontSizes.h7,
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
                        marginBottom: 5,
                        marginHorizontal: 15,
                        alignSelf: 'center'
                    }} />
                    <Text style={{
                        color: 'red',
                        fontSize: fontSizes.h7,
                        marginBottom: 10
                    }}>{errorPassword}</Text>
                </View>

                <View style={{
                    marginHorizontal: 15
                }}>
                    <Text style={{
                        color: colors.primary,
                        fontSize: fontSizes.h6
                    }}>Retype password:</Text>
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
                        placeholder='Re-Enter your password'
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
                        fontSize: fontSizes.h7,
                        marginBottom: 5
                    }}>{errorPassword}</Text>
                </View>

                <TouchableOpacity
                    disabled={isValidationOK() == false}
                    onPress={() => alert(`Email = ${email}, password = ${password}`)}
                    style={{
                        backgroundColor: isValidationOK() == true ? colors.primary : colors.inactive,
                        marginHorizontal: 30,
                        width: '50%',
                        alignSelf: 'center',
                        borderRadius: 20
                    }}>
                    <Text style={{
                        alignSelf: 'center',
                        color: 'white',
                        padding: 8,
                        fontSize: fontSizes.h5
                    }}>Register</Text>
                </TouchableOpacity>
            </View>

            {keyboardIsShown == false && <View style={{
                flex: 25
            }}>
                <View style={{
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 20
                }}>
                    <View style={{ height: 1, backgroundColor: 'white', flex: 1 }} />
                    <Text style={{
                        alignSelf: 'center',
                        color: 'white',
                        padding: 8,
                        fontSize: fontSizes.h7,
                        marginHorizontal: 5
                    }}>Use other methods?</Text>
                    <View style={{ height: 1, backgroundColor: 'white', flex: 1 }} />
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
    </View>

}
export default Register