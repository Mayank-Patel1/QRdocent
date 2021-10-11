import React, {useEffect, useState} from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CameraButton from '../Components/Buttons/CameraButton';
import ShowMeButton from '../Components/Buttons/ShowMeButton';
import ScanningIcon from '../Components/SvgComponents/ScanningIcon';
import Header from '../Components/Header';
import ScannedExhibits from '../Components/ScannedExhibits';
import axios from 'axios';
const HomeScreen = ({ route, navigation }) => {
    
    

    const [userScans, setUserScans] = useState(true);
    const [exhibits, setExhibits] = useState();

    let data;


   

    
    useEffect(()=> {

    

        console.log("IM HERE")

        try {
            axios({
    
                method: 'get',
                url: 'https://qrdocent.com/api/mockExhibit',
    
            }).then(res => {
                // console.log(res.data);
                setExhibits(res.data);
                if(route.params !== undefined){
                setUserScans(route.params.scanned);
                console.log(route.params.scanned)
                }
            }).catch(err => console.log(err))
        } catch (err) {
            console.log(err)
        }

    },[route.params])
   

    function goScan() {
        navigation.navigate('QR Scanner')
    }

    function goHelp() {
        navigation.navigate('Help')
    }

    function goHome() {
      navigation.navigate('SignIn')
    }

    return (
        <View
            style={{ backgroundColor: '#282B33', flex: 1, }}>
                <Header goHome={goHome} showSettings={true}/>
                {/* If the user hasn't scanned any QR codes */}
            {!userScans && <View style={{ flex: 0.085, }}></View>}
            {!userScans && <View
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
            </View>}


{/* If the User has scanned QR codes before */}
            {userScans && exhibits !== undefined && <ScannedExhibits navigation={navigation} image={exhibits.artistImage} data={exhibits}/>}


            { userScans && exhibits !== undefined ? <View style={{ flex: 0.15,justifyContent: "flex-end", alignItems: "center", paddingBottom:40,borderRadius:20 }}>
                <CameraButton goScan={goScan} size={90} borderRadius={44}/>
            </View> :

            <View style={{ flex: 0.4,justifyContent: "flex-end", alignItems: "center", paddingBottom:40, borderRadius:15 }}>
                <CameraButton goScan={goScan} size={90} borderRadius={44}/>
            </View>}
        </View>
    )
}

export default HomeScreen;