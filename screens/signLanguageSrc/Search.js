import React, { useState, useEffect, useRef } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Text,
    ScrollView
} from 'react-native'
import { UIHeader, UISearchInput } from '../../components';
import { colors, icons, fontSizes, videos, images } from '../../constants';
import { Spacing, screenHeight, screenWidth } from "../../utilies/Device";
import Video from "react-native-video";
import VideoPlayer from 'react-native-video-controls';
import { storage, firebaseDatabase } from "../../config";
import { onValue, ref } from "firebase/database";

function Search(props) {
    //for search
    const [searchKeyword, setSearchKeyword] = useState(' ')
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [showText, setShowText] = useState(false);

    //for result
    const [videos, setVideos] = useState([])
    const [nameOfVideos, setNameOfVideos] = useState([])
    const [videoUrl, setVideoUrl] = useState('')
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([])

    //handle
    const keywordLowerCase = searchKeyword.toLowerCase().trim();
    useEffect(() => {
        // const db = getDatabase()
        const videosRef = ref(firebaseDatabase, 'Videos');
        onValue(videosRef, (snapshot) => {
            const videosData = snapshot.val();
            if (videosData) {
                setVideos(Object.values(videosData))
                // console.log(Object.values(videosData))
            } else {
                console.log('No data available')
            }
        }, (error) => {
            console.error('Error fetching data: ', error);
        });
    }, []);
    const updateAutocompleteSuggestions = (text) => {
        if (text.length > 0) {
            const fiteredSuggestions = videos.filter(video => video.Name.toLowerCase().includes(text.toLowerCase()))
            setAutocompleteSuggestions(fiteredSuggestions)
        }
        else {
            setAutocompleteSuggestions([]);
        }
    }

    const handleSearch = (text) => {
        setSearchKeyword(text);
        setAutocompleteSuggestions([]);
        setShowText(false);
        setIsVideoVisible(false);
        updateAutocompleteSuggestions(text);
        if (keywordLowerCase.length > 0) {
            setShowText(true);
        }
        if (videos.some(video => video.Name.toLowerCase() === searchKeyword.toLowerCase())) {
            setIsVideoVisible(true);

        } else {
            setIsVideoVisible(false);
        }
    };
    useEffect(() => {
        const matchedVideo = videos.find(video => video.Name.toLowerCase() === searchKeyword.toLowerCase());
        if (matchedVideo) {
            setVideoUrl(matchedVideo.Url);
        }
    }, [searchKeyword, videos]);
    return <View style={{
        backgroundColor: 'white',
        flex: 1
    }}>
        <UIHeader
            navigation={props.navigation}
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
                marginTop: Spacing / 2,
                color: 'black',
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
                    updateAutocompleteSuggestions(text)
                }}
                value={searchKeyword}
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
        </View>
        <View>
            <View style={{
                width: screenWidth * 0.91,
                zIndex: 10,
                position: 'absolute',
                top: -Spacing * 0.8,
                marginHorizontal: Spacing * 2,
                backgroundColor: 'white'
            }}>
                <ScrollView style={{ maxHeight: Spacing * 1.35 * (fontSizes.h6 + Spacing * 0.8) }}>
                    {autocompleteSuggestions.map((suggestion, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setSearchKeyword(suggestion.Name);
                                setShowText(true);
                                setIsVideoVisible(videos.some(video => video.Name.toLowerCase() === suggestion.Name.toLowerCase()));
                                setAutocompleteSuggestions([]);
                            }}
                        >
                            <Text style={{
                                backgroundColor: 'white',
                                width: '100%',
                                color: 'black',
                                fontFamily: 'Poppins-Regular',
                                fontSize: fontSizes.h6,
                                padding: Spacing * 0.8,
                                textAlignVertical: 'center'
                            }}>{suggestion.Name}</Text>
                            <View style={{
                                height: 1, width: '100%',
                                backgroundColor: '#CECECE',
                            }} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

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
                    {/* {!isVideoVisible ? (
                        <Image
                            source={images.preSearchResult}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain'
                            }} />) : (
                        <VideoPlayer
                            // controls={true}
                            source={{ uri: videoUrl }} />
                    )} */}
                    {videoUrl ? ( // Kiểm tra xem videoUrl có giá trị không trước khi render VideoPlayer
                        <VideoPlayer
                            source={{ uri: videoUrl }} />
                    ) : (
                        <Image
                            source={images.preSearchResult}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain'
                            }} />
                    )}
                </View>
                {showText && (
                    <Text style={{
                        fontSize: fontSizes.h5,
                        alignSelf: 'center',
                        color: "white",
                        fontFamily: 'Poppins-Medium',
                        marginVertical: Spacing
                    }}>
                        {videos.some(video => video.Name.toLowerCase() === searchKeyword.toLowerCase()) ? searchKeyword.toUpperCase() : `No direct match on "${searchKeyword}"`}
                    </Text>
                )}
            </View>
        </View>
    </View>
}
export default Search