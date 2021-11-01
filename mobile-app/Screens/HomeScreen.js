import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CameraButton from '../Components/Buttons/CameraButton';
import ShowMeButton from '../Components/Buttons/ShowMeButton';
import ScanningIcon from '../Components/SvgComponents/ScanningIcon';
import Header from '../Components/Header';
import ScannedExhibits from '../Components/ScannedExhibits';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';

const HomeScreen = ({ route, navigation }) => {
    const [userScans, setUserScans] = useState(false);
    const [loading, setLoading] = useState(true)
    const [exhibits, setExhibits] = useState();
    const [trigger, setTrigger] = useState(true)

    if(typeof(route.params) != "undefined"){
        setTrigger(route.params.trigger)
    }



    const getToken = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@tokens')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e);
        }
    }





    useEffect(() => {
        // if(true) {
        //     setLoading(false);
        //     setUserScans(false);
        //     return
        // }

        getToken().then(tokenValue => {

            if (tokenValue.accessToken == null) {
                navigation.navigate("SignIn")
            }
            else {

                console.log(tokenValue)


                try {
                    axios({

                        method: 'get',
                        url: 'https://qrdocent.com/api/getAllMuseumUserScans',
                        headers: {
                            authorization: `Bearer ${tokenValue.accessToken}`
                        }

                    }).then(res => {
                        console.log(res.data)
                        if (res.data.success == false) {
                            
                            navigation.replace("LogIn");
                        }
                        else {
                            setExhibits(res.data.result.scans);

                            if (res.data.result.scans.length !== 0) {
                                console.log(res.data.result.scans)
                                setUserScans(true)
                            }

                            setLoading(false)
                        }


                    }).catch(err => console.log(err))
                } catch (err) {
                    console.log(err)
                }
            }
        }).catch(() => {
            navigation.replace("LogIn");
        }
        )
    },[trigger])

    function goScan() {
        navigation.replace('QR Scanner')
    }

    function goHelp() {
        navigation.navigate('Help')
    }

    function goHome() {
        navigation.navigate('SignIn')
    }

    if (loading == true) {
        return (
            <LoadingScreen/>
        )
    }

    return (
        <View
            style={{ backgroundColor: '#282B33', flex: 1, }}>
            <Header goHome={goHome} showSettings={true} />

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
            {userScans && exhibits !== undefined && <ScannedExhibits navigation={navigation} image={exhibits.artistImage} data={exhibits} />}


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