import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CameraButton from './Buttons/CameraButton';
import ShowMeButton from './Buttons/ShowMeButton';
import ScanningIcon from './Icons/ScanningIcon';
import Header from '../../Components/Header';
import ScannedExhibits from './Components/ScannedExhibits';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../Loading/LoadingScreen';
import ErrorScreen from '../Error/ErrorScreen';
import { getToken, refreshToken } from '../../Authorize/authorize';

const HomeScreen = ({ route, navigation }) => {



    const [userScans, setUserScans] = useState(false);
    const [loading, setLoading] = useState(true)
    const [connectionError, setConnectionError] = useState(false)

    const [exhibits, setExhibits] = useState();
    const [trigger, setTrigger] = useState(true);

    if(typeof(route.params) != "undefined"){
        setTrigger(route.params.trigger)
    }





    useEffect(() => {
        // if(true) {
        //     setLoading(false);
        //     setUserScans(false);
        //     return
        // }

        getToken().then(tokenValue => {

            if (tokenValue.accessToken == null) {
                navigation.replace("SignIn")
            }
            else {

                //console.log(tokenValue)


                try {
                    axios({

                        method: 'get',
                        url: 'https://qrdocent.com/api/getAllMuseumUserScans',
                        headers: {
                            authorization: `Bearer ${tokenValue.accessToken}`
                        }

                    }).then(res => {
                        
                        if (res.data.success == false) {
                             refreshToken(navigation, true)
                             console.log(tokenValue)

                            
                        }
                        else {
                            console.log(tokenValue)
                            setExhibits(res.data.result.scans);

                            if (res.data.result.scans.length !== 0) {
                               // console.log(res.data.result.scans)
                                setUserScans(true)
                            }

                            setLoading(false)
                        }


                    }).catch(err => {
                        setTimeout(()=>{
                            setLoading(false)
                            setConnectionError(true)
                        },5000)
                    })
                } catch (err) {
                    setTimeout(()=>{
                        setLoading(false)
                        setConnectionError(true)
                    },5000)
                }
            }
        }).catch(() => {
            navigation.replace("SignIn");
        }
        )
    },[trigger])


    function goScan() {
        refreshToken(navigation, false)
        navigation.replace('QR Scanner')
    }

    function goHelp() {
        refreshToken(navigation, false)
        navigation.replace('Help')
    }

    function goSettings() {
        refreshToken(navigation, false)
        navigation.replace('Settings')
    }

    if (loading == true) {
        return (
            <LoadingScreen/>
        )
    }

    if (connectionError == true) {
        return (
            <ErrorScreen navigation={navigation}/>
        )
    }



    return (
        <View
            style={{ backgroundColor: '#282B33', flex: 1, }}>
            <Header goSettings={goSettings} navigation={navigation} showSettings={true} />

            {/* If the user hasn't scanned any QR codes */}
            {!userScans && <View style={{ flex: 0.085, }}></View>}
            {!userScans && <View
                style={{
                    flex: 0.40,
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}>
                <ScanningIcon style={{ stroke: "white" }} stroke="white" home={true}></ScanningIcon>
                <Text style={{ color: 'white', fontFamily: 'System', fontSize: 37, textAlign: "center" }}>
                    SCAN A CODE TO {"\n"} GET STARTED.
                </Text>


                <ShowMeButton goHelp={goHelp} />
            </View>}


            {/* If the User has scanned QR codes before */}
            {userScans && exhibits !== undefined && <ScannedExhibits navigation={navigation} exhibits={exhibits} />}


            {userScans && exhibits !== undefined ? <View style={{ flex: 0.15, justifyContent: "flex-end", alignItems: "center", paddingBottom: 40, borderRadius: 20 }}>
                <CameraButton goScan={goScan} size={90} borderRadius={44} />
            </View> :

                <View style={{ flex: 0.4, justifyContent: "flex-end", alignItems: "center", paddingBottom: 40, borderRadius: 15 }}>
                    <CameraButton goScan={goScan} size={90} borderRadius={44} />
                </View>}
        </View>
    )
}

export default HomeScreen;