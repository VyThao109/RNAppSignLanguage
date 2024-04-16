import React, { useEffect } from 'react';
import {
    ImageBackground,
    Text,
} from 'react-native'
import LottieView from 'lottie-react-native'
import { images } from '../../constants';
import { screenWidth } from '../../utilies/Device';

function Splash({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);
        return () => clearTimeout(timer);
    }, [])
    return <ImageBackground
        source={images.logo}
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        resizeMode='cover'>
        <Text style={{
            fontSize: fontSizes.h1,
            color: colors.main,
            fontFamily: 'Poppins-Bold',
            marginTop: Spacing / 2
        }}>Spalsh screen</Text>
    </ImageBackground>
}
export default Splash