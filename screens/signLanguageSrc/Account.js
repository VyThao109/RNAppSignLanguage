import React, { useEffect, useState } from "react";
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import UIHeader from '../../components/UIHeader';
import { colors, icons, fontSizes, images } from '../../constants';
import { Spacing, screenHeight, screenWidth } from "../../utilies/Device";
import { isValidPassword } from '../../utilies/Validations'
import { auth } from "../../config";
import Modal from "react-native-modal";

function Account(props) {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')


    const [errorPassword, setErrorPassword] = useState(' ')

    const isValidationOK = () => currentPassword.length > 0 && newPassword.length > 0 && confirmNewPassword.length > 0
        && isValidPassword(newPassword) == true

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword)
    }
    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }
    const toggleShowConfirmNewPassword = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword)
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const handleSubmit = async () => {
        try {
            // const credential = auth.EmailAuthProvider.credential(
            //     auth.currentUser.email,
            //     currentPassword
            // );
            var user = auth.currentUser;
            
            // await auth.currentUser.reauthenticateWithCredential(credential);
            if (newPassword !== confirmNewPassword) {
                Alert.alert('New password and confirm password do not match');
                return;
            }
            await auth.currentUser.updatePassword(newPassword);
            Alert.alert('Password updated successfully');
            toggleModal()
            resetForm();
        } catch (error) {
            // Xử lý lỗi
            console.error('Error updating password:', error.message);
            Alert.alert('Error updating password. Please try again.');
        }
    };
    

    const resetForm = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }
    const onLogout = () => {
        return auth.signOut()
            .then(response => {
                // Alert.alert("User signed out!")
                console.log('User signed out!')
                return true
            }).catch(error => {
                Alert.alert('Not able to sign out!')
                return Promise.resolve(false)
            })
    }

    const { navigation, route } = props
    const { navigate, goBack } = navigation
    return <View style={{
        backgroundColor: 'white',
        flex: 1,

    }}>
        <UIHeader
            navigation={props.navigation}
            title={"Account"}
            rightIconName={undefined}
            onPressLeftIcon={() => {
                alert('press left icon')
            }}
        />
        <View style={{
            alignItems: 'flex-end'
        }}>
            <ImageBackground
                source={images.backgroundAccount}
                style={{
                    width: screenHeight / 3,
                    height: screenHeight / 3,

                }} />
        </View>
        <View style={{
            paddingHorizontal: Spacing * 2
        }}>
            <Text style={{
                color: colors.main,
                fontSize: fontSizes.h6,
                fontFamily: 'Poppins-Regular',
                marginLeft: Spacing / 2
            }}>Email address</Text>
            <TextInput
                value={auth.currentUser.email}
                editable={false}
                style={{
                    width: '100%',
                    color: 'black',
                    fontSize: fontSizes.h6,
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: colors.lightPrimary,
                    padding: Spacing * 2 / 3,
                    borderRadius: Spacing / 2,
                    marginBottom: Spacing * 2
                }}
            />
        </View>

        <View style={{
            flexDirection: 'row',
            paddingHorizontal: Spacing * 2,
            marginTop: Spacing * 2,
            justifyContent: 'flex-end'
        }}>
            <TouchableOpacity
                onPress={toggleModal}
                style={{
                    backgroundColor: colors.primary,
                    padding: Spacing * 0.8,
                    borderRadius: Spacing / 2,
                    shadowColor: colors.primary,
                    elevation: 5,
                    width: "45%",
                    alignItems: 'center',

                }}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    fontFamily: 'Poppins-SemiBold',
                    textAlign: 'center',
                    color: 'white',
                }}>Change password</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
                onPress={() => {
                    onLogout().then(success => {
                        if (success) {
                            navigate('Login');
                        }
                    });
                }}
                style={{
                    backgroundColor: colors.primary,
                    padding: Spacing * 0.8,
                    borderRadius: Spacing / 2,
                    shadowColor: colors.primary,
                    elevation: 5,
                    width: "45%",
                    alignItems: 'center',

                }}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    fontFamily: 'Poppins-SemiBold',
                    textAlign: 'center',
                    color: 'white',
                }}>Sign out</Text>
            </TouchableOpacity>
        </View>
        <Modal isVisible={isModalVisible}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
                    <SafeAreaView style={{
                        paddingVertical: Spacing * 3,
                        height: screenHeight,
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
                                height: screenHeight / 2,
                                borderRadius: Spacing,
                                justifyContent: 'center',
                                elevation: 20
                            }}>
                                <View style={{
                                    marginHorizontal: Spacing
                                }}>
                                    <TouchableOpacity onPress={toggleModal}>
                                        <Image
                                            source={icons.close}
                                            style={{
                                                width: Spacing * 1.5,
                                                height: Spacing * 1.5,
                                                alignSelf: 'flex-end',
                                                tintColor: colors.main,
                                                top: -Spacing
                                            }} />                                        
                                    </TouchableOpacity>

                                    <View style={{
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            fontSize: fontSizes.h1,
                                            color: colors.main,
                                            fontFamily: 'Poppins-Bold',
                                            marginTop: Spacing / 2
                                        }}>Change password</Text>
                                    </View>
                                    <View style={{
                                        marginTop: Spacing * 2,
                                        marginVertical: Spacing
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginVertical: Spacing,
                                            marginBottom: Spacing * 2
                                        }}>
                                            <TextInput
                                                value={currentPassword}
                                                placeholder='Current password'
                                                placeholderTextColor={colors.placeholder}
                                                secureTextEntry={!showCurrentPassword}
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
                                                    setCurrentPassword(text)
                                                }} />
                                            <TouchableOpacity
                                                onPress={toggleShowCurrentPassword}
                                                style={{
                                                    top: Spacing / 2,
                                                    right: Spacing * 3.5,
                                                    alignSelf: 'center',
                                                }}>
                                                <Image
                                                    source={showCurrentPassword ? icons.showPass : icons.hidePass}
                                                    style={{
                                                        width: Spacing * 2.5,
                                                        height: Spacing * 2.5,
                                                        alignContent: 'center',
                                                        tintColor: colors.main
                                                    }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginVertical: Spacing
                                        }}>
                                            <TextInput
                                                placeholder='New password'
                                                value={newPassword}
                                                placeholderTextColor={colors.placeholder}
                                                secureTextEntry={!showNewPassword}
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
                                                    setNewPassword(text)
                                                }} />
                                            <TouchableOpacity
                                                onPress={toggleShowNewPassword}
                                                style={{
                                                    top: Spacing / 10,
                                                    right: Spacing * 3.5,
                                                    alignSelf: 'center'
                                                }}>
                                                <Image
                                                    source={showNewPassword ? icons.showPass : icons.hidePass}
                                                    style={{
                                                        width: Spacing * 2.5,
                                                        height: Spacing * 2.5,
                                                        alignContent: 'center',
                                                        tintColor: colors.main
                                                    }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: Spacing
                                        }}>
                                            <TextInput
                                                value={confirmNewPassword}
                                                placeholder='Confirm new password'
                                                placeholderTextColor={colors.placeholder}
                                                secureTextEntry={!showConfirmNewPassword}
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
                                                    setConfirmNewPassword(text)
                                                }} />
                                            <TouchableOpacity
                                                onPress={toggleShowConfirmNewPassword}
                                                style={{
                                                    top: Spacing / 2,
                                                    right: Spacing * 3.5,
                                                    alignSelf: 'center',
                                                }}>
                                                <Image
                                                    source={showConfirmNewPassword ? icons.showPass : icons.hidePass}
                                                    style={{
                                                        width: Spacing * 2.5,
                                                        height: Spacing * 2.5,
                                                        alignContent: 'center',
                                                        tintColor: colors.main
                                                    }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        disabled={isValidationOK() == false}
                                        onPress={handleSubmit}
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
                                        }}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
                </ScrollView>

            </KeyboardAvoidingView>
        </Modal>
    </View>
}
export default Account