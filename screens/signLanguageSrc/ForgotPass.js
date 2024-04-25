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
    Image,
    Alert
} from 'react-native'
import { UIHeader, UISearchInput } from '../../components';
import { images, colors, icons, fontSizes } from '../../constants'
import { screenHeight, screenWidth, Spacing } from '../../utilies/Device';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isValidEmail } from '../../utilies/Validations'
import { auth } from '../../config';

function ForgotPass(props) {
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(' ')
    const isValidationOK = () => email.length > 0 > 0 && isValidEmail(email) == true

    const handleRecoverPassword = () => {
        if (email.trim() === '') {
            Alert.alert('Please enter your email');
            return;
        }

        return auth.sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert('Password reset email has been sent to your email address.');
                return true
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('No user found with this email address.');
                } else {
                    Alert.alert('An error occurred. Please try again later.');
                }
            });
    };
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
                            alignItems: 'center',
                            marginBottom: Spacing / 2
                        }}>
                            <TouchableOpacity
                                onPress={() => goBack()}>
                                <Image
                                    source={icons.back}
                                    style={{
                                        width: Spacing * 2.3,
                                        height: Spacing * 2.3,
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
                                }}>Forgot password</Text>
                                <Text style={{
                                    paddingTop: Spacing * 0.8,
                                    fontSize: fontSizes.h6,
                                    fontFamily: 'Poppins-Regular',
                                    textAlign: 'center',
                                    width: "80%",
                                    color: colors.inactive,
                                }}>Enter the email address associated with you account</Text>
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
                                        setEmail(text)
                                    }}
                                    value={email} />
                            </View>
                            <TouchableOpacity
                                disabled={isValidationOK() == false}
                                // onPress={() => navigate('Login')}
                                onPress={() => { 
                                    handleRecoverPassword().then(success => {
                                        if (success) {
                                            navigate('Login');
                                        }
                                    });
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
                                }}>Recover password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </ScrollView>
    </KeyboardAvoidingView>
}
export default ForgotPass