import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { icons, images, fontSizes, colors } from '../constants'
import { UIButton } from '../components'
// import { Icon } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Colors } from 'react-native/Libraries/NewAppScreen';


function Welcome(props) {
    //neu nhu co 100 nut thi se ko the tao tay, ma dung phuong phap map -> tu do dung state
    //state => khi state thay doi thi UI reload lai
    //like getter/setter
    const [accountTypes, setAccountypes] = useState([
        {
            name: 'Influencer',
            isSelected: true,
        },
        {
            name: 'Business',
            isSelected: false,
        },
        {
            name: 'Individual',
            isSelected: false
        }
    ])

    //navigation
    const {navigation, route} = props
    //functions of navigate to/back
    const{navigate, goBack} = navigation

    
    return <View style={{
        backgroundColor: 'F0F0F0',
        flex: 100 //toàn màn hình
    }}>
        <ImageBackground source={
            images.background
        }
            resizeMode='cover'
            style={{
                flex: 100
            }}
        >
            <View style={{
                flex: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'flex-start', //bố trí từ trái sang phải
                    alignItems: 'center',//theo chiều vuông góc với justifyContent
                }}>
                    <Image source={icons.fire}
                        style={{
                            //marginStart:10,
                            marginHorizontal: 8,
                            width: 30,
                            height: 30,
                        }}></Image>
                    <Text style={{
                        color: 'white'
                    }}>YOURCOMPANY.CO</Text>
                    <View style={{
                        flex: 1
                    }}>
                    </View>
                    {/* <Icon
                        size={20}
                        name={"check-circle"}
                        style={{
                            marginEnd: 10
                        }}/> */}
                    <Image
                        source={icons.question}
                        style={{
                            width: 20, height: 20,
                            tintColor: 'white',
                            marginEnd: 10
                        }}
                    ></Image>
                </View>
            </View>


            <View style={{
                flex: 20,
                width: '100%',
                // backgroundColor: 'purple',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Text style={[styles.textStyle,
                { fontSize: fontSizes.h6 }]}>
                    Welcome to</Text>
                <Text style={[styles.textStyle,
                { fontWeight: 'bold' },
                { fontSize: fontSizes.h5 }
                ]}>YOURCOMPANY.CO</Text>
                <Text style={[styles.textStyle,
                { fontSize: fontSizes.h6 }
                ]}>Please select your account type</Text>
            </View>


            <View style={{
                flex: 40,
                // backgroundColor: 'purple'
            }}>
                {accountTypes.map(accountType =>
                    <UIButton onPress={() => {
                        let newAccountTypes = accountTypes.map(eachAccountType => {
                            // if(eachAccountType.name == accountType.name) {
                            //     return {...eachAccountType, isSelected: true} //...eachAccountType: nhan ban doi tuong
                            // }
                            // else {
                            //     return {...eachAccountType, isSelected: false} //giu nguyen
                            // }

                            //like cmt tren
                            return {
                                ...eachAccountType, //nhan ban doi tuong
                                isSelected: eachAccountType.name == accountType.name
                            }

                        })
                        setAccountypes(newAccountTypes)
                        // giong accountTypes = newAccountTypes (nhg ko dung dc)
                    }}
                        title={accountType.name}
                        isSelected={accountType.isSelected}
                    ></UIButton>)}
            </View>

            <View style={{
                flex: 20
            }}>
                <UIButton
                    onPress={()=>{
                        // alert('Press login')
                        navigate('Login')
                    }} title={'Login'.toUpperCase()} />

                <Text style={[styles.textStyle,
                {
                    fontSize: fontSizes.h6,
                    alignSelf: 'center'
                }
                ]}>Want to register new Account ?</Text>

                <TouchableOpacity 
                    onPress={()=> alert('pressed')}
                    style={{
                    padding: 5
                }}>
                    <Text style={[styles.textStyle,
                    {
                        color: colors.primary,
                        fontSize: fontSizes.h6,
                        alignSelf: 'center',
                        textDecorationLine: 'underline'
                    }
                    ]}>Regiter</Text>                    
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </View>
}
const styles = StyleSheet.create({
    textStyle: {
        color: 'white', // This sets the color for all Text components
        marginBottom: 7
    }
});
export default Welcome