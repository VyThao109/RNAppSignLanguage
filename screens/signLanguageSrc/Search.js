import React, { useState, useEffect, useRef } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Text
} from 'react-native'
import { UIHeader, UISearchInput } from '../../components';
import { colors, icons, fontSizes, videos, images } from '../../constants';
import { Spacing, screenHeight, screenWidth } from "../../utilies/Device";
import Video from "react-native-video";
import VideoPlayer from 'react-native-video-controls';
function Search(props) {
    const [searchKeyword, setSearchKeyword] = useState(' ')
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [showText, setShowText] = useState(false);
    
    const keywordLowerCase = searchKeyword.toLowerCase().trim();
    const handleSearch = (text) => {
        setSearchKeyword(text);
        if(keywordLowerCase.length > 0){
            setShowText(true);
        }
        if (keywordLowerCase === "communicate") {
            setIsVideoVisible(true);
            
        } else {
            setIsVideoVisible(false);
        }
    };
    return <View style={{
        backgroundColor: 'white',
        flex: 1
    }}>
        <UIHeader
            title={"Search"}
            rightIconName={undefined}
            onPressLeftIcon={() => {
                alert('press left icon')
            }}
        />
        <View style={{
            flexDirection: 'row',
            paddingHorizontal: Spacing * 0.8,
            paddingVertical: Spacing
        }}>
            <TextInput style={{
                fontFamily: 'Poppins-Regular',
                fontSize: fontSizes.h6,
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: Spacing * 3,
                position: 'relative',
                width: "100%",
                marginHorizontal: Spacing / 6,
                paddingHorizontal: Spacing * 1.5,
                paddingBottom: Spacing / 2,
            }}
                placeholder="Search sign language"
                placeholderTextColor={colors.placeholder}
                onChangeText={(text) => { 
                    setSearchKeyword(text); 
                    setShowText(false);
                    setIsVideoVisible(false);
                }}
            ></TextInput>
            <TouchableOpacity
                onPress={() => handleSearch(searchKeyword)}
                style={{
                    top: Spacing / 10,
                    right: Spacing * 5,
                    alignSelf: 'center',
                }}>
                <Image
                    source={icons.search}
                    style={{
                        width: 20, height: 20,
                        tintColor: colors.inactive,
                        margin: 10,
                    }} />
            </TouchableOpacity>

            <TouchableOpacity style={{
                top: Spacing / 10,
                right: Spacing * 4,
            }}>
                <Image
                    source={icons.filter}
                    style={{
                        width: 26, height: 26,
                        tintColor: colors.main,
                        marginVertical: Spacing,
                        marginRight: Spacing,
                        marginLeft: Spacing / 2,
                    }} />
            </TouchableOpacity>
        </View>
        <View style={{
            width: screenWidth * 0.95,
            marginTop: Spacing * 4,
            backgroundColor: colors.lightMain,
            height: screenHeight / 2.5,
            alignSelf: "center",
        }}>
            <View style={{
                backgroundColor: colors.main,
            }}>
                <Text style={{
                    fontSize: fontSizes.h5,
                    alignSelf: 'center',
                    color: "white",
                    fontFamily: 'Poppins-Medium',
                    marginVertical: Spacing
                }}>Sign Language</Text>
            </View>

            <View style={{
                alignSelf: 'center',
                backgroundColor: "white",
                height: screenHeight / 4.5,
                width: screenWidth - Spacing * 5.2,
                margin: Spacing
            }}>
                {!isVideoVisible ? (
                    <Image
                        source={images.preSearchResult}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain'
                        }} />) : (
                    <VideoPlayer
                        controls={true}
                        source={videos.communicateSignLanguage}/>
                )}

            </View>
            {showText && (
                <Text style={{
                    fontSize: fontSizes.h5,
                    alignSelf: 'center',
                    color: "white",
                    fontFamily: 'Poppins-Medium',
                    marginVertical: Spacing
                }}>{keywordLowerCase === "communicate" ? "Communicate" : `No direct match on "${searchKeyword}"`}</Text>)}
        </View>
    </View>
}
export default Search