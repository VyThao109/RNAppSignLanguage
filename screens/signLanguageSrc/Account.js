import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native'
import UIHeader from '../../components/UIHeader';
import { colors, icons, fontSizes, images } from '../../constants';
import { Spacing, screenHeight, screenWidth } from "../../utilies/Device";

function Account(props) {
    const [email, setEmail] = useState('thaonguyenvy109@gmail.com')
    const [password, setPassword] = useState('123456')

    const [showPassword, setShowPassword] = useState(false)
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
            <View style={{
                flexDirection: 'row'
            }}>
                <TextInput
                    value={email}
                    placeholder='Email'
                    placeholderTextColor={colors.placeholder}
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
                        if (isValidEmail(text) == false) {
                            setErrorEmail('Email not in correct format')
                        }
                        else {
                            setErrorEmail(' ')
                        }
                        setEmail(text)
                    }} />
                <TouchableOpacity
                    // onPress={toggleShowPassword}
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

            <Text style={{
                color: colors.main,
                fontSize: fontSizes.h6,
                fontFamily: 'Poppins-Regular',
                marginLeft: Spacing / 2
            }}>Password</Text>
            <TextInput
                placeholder='Password'
                value={password}
                placeholderTextColor={colors.placeholder}
                secureTextEntry
                style={{
                    fontSize: fontSizes.h6,
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    backgroundColor: colors.lightPrimary,
                    padding: Spacing * 2 / 3,
                    borderRadius: Spacing / 2,
                    marginBottom: Spacing * 2
                }}
                onChangeText={(text) => {
                    setPassword(text)
                }} />
        </View>

        <View style={{
            flexDirection: 'row',
            paddingHorizontal: Spacing * 2,
            marginTop: Spacing * 2,
        }}>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.primary,
                    padding: Spacing * 0.8,
                    borderRadius: Spacing / 2,
                    shadowColor: colors.primary,
                    elevation: 5,
                    width: "45%",
                    alignItems: 'center'
                }}>
                <Text style={{
                    fontSize: fontSizes.h6,
                    fontFamily: 'Poppins-SemiBold',
                    textAlign: 'center',
                    color: 'white',
                }}>Change pass</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.primary,
                    padding: Spacing * 0.8,
                    borderRadius: Spacing / 2,
                    shadowColor: colors.primary,
                    elevation: 5,
                    width: "45%",
                    alignItems: 'center'
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