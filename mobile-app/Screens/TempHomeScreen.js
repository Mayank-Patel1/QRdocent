import React from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CameraButton from '../Components/CameraButton';
import ShowMeButton from '../Components/ShowMeButton';
import ScanningIcon from '../Components/SvgComponents/ScanningIcon';
import Header from '../Components/Header';
const HomeScreen = ({ navigation }) => {

    function goScan() {
        navigation.navigate('QR Scanner')
    }

    function goHelp() {
        navigation.navigate('Help')
    }

    return (
        <View
            style={{ backgroundColor: '#282B33', flex: 1, }}>
                <Header showSettings={true}/>
            <View style={{ flex: 0.085}}></View>
            <View
                style={{
                    flex: 0.40,
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}>
                <ScanningIcon style={{ stroke: "white" }} stroke="white"></ScanningIcon>
                <Text style={{ color: 'white', fontFamily: 'System', fontSize: 37, textAlign: "center" }}>
                    SCAN A CODE TO {"\n"} GET STARTED.
                </Text>


                <ShowMeButton goHelp={goHelp} />
            </View>
            <View style={{ flex: 0.4,justifyContent: "flex-end", alignItems: "center", paddingBottom:40 }}>
                <CameraButton goScan={goScan} size={90} borderRadius={44}/>
            </View>


        </View>
    )
}

export default HomeScreen;