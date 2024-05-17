import React, { Component } from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import { colors, fontSizes, icons } from "../constants";
import { Spacing } from "../utilies/Device";
import Modal from "react-native-modal";

function UIAlert(props) {
    const {
        content,
        isVisible
    } = props
    return <Modal>
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
    </Modal>
}
export default UIAlert