import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import UIHeader from '../../components/UIHeader';
import { colors, icons, fontSizes, images } from '../../constants';
import { Spacing, screenHeight, screenWidth } from "../../utilies/Device";
import { auth } from "../../config";

function Account(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
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
            <Text style={{
                color: colors.main,
                fontSize: fontSizes.h6,
                fontFamily: 'Poppins-Regular',
                marginLeft: Spacing / 2
            }}>Password</Text>
            <View style={{
                flexDirection: 'row'
            }}>
                <TextInput
                    placeholder='Password'
                    editable={false}
                    value={auth.currentUser.password}
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry
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
                    onChangeText={(text) => {
                        setPassword(text)
                    }} />
                <TouchableOpacity
                    style={{
                        top: -Spacing,
                        right: Spacing * 3.5,
                        alignSelf: 'center'
                    }}>
                    <Image
                        source={icons.edit}
                        style={{
                            width: Spacing * 2.3,
                            height: Spacing * 2.3,
                            alignContent: 'center',
                            tintColor: colors.main
                        }} />
                </TouchableOpacity>
            </View>


        </View>

        <View style={{
            flexDirection: 'row',
            paddingHorizontal: Spacing * 2,
            marginTop: Spacing * 2,
            justifyContent: 'flex-end'
        }}>
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
                }}>Edit password</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
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
    </View>
}
export default Account