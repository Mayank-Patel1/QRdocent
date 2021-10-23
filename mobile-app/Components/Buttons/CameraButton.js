import React from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity, } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CameraIcon from '../SvgComponents/CameraIcon';

const CameraButton = (props) => {

    return (
        <TouchableHighlight onPress={props.goScan} style={{ borderRadius: 50 }} disabled={props.disable}>
            <LinearGradient

                colors={['#614AD3', '#E42C64']}
                style={{ height: props.size, width: props.size, backgroundColor: "red", borderRadius: props.borderRadius, alignItems: "center", justifyContent: "center" }}>
                <CameraIcon/>
            </LinearGradient>
        </TouchableHighlight>
    )
}

export default CameraButton;