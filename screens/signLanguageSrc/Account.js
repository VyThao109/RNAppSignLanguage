import React from "react";
import {
    View,
    TextInput,
} from 'react-native'
import UIHeader from '../../components/UIHeader';
import { colors, icons, fontSizes } from '../../constants';
import { Spacing } from "../../utilies/Device";

function Account(props) {
    return <View style={{
        backgroundColor: 'white',
        flex: 1, 

    }}>
        <UIHeader
            title={"Account"}
            rightIconName={undefined}
            onPressLeftIcon={() => {
                alert('press left icon')
            }}
        />
        <View style={{height: Spacing}}/>
        <View>

        </View>
    </View>
}
export default Account