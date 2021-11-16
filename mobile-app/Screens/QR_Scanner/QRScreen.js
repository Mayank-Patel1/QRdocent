import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, BackHandler } from 'react-native';
import { Button } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Header from '../../Components/Header';
import QRscanner from './Components/QRscanner';
import axios from 'axios';
import { getToken, refreshToken } from '../../Authorize/authorize';

const QRScreen = ({ navigation }) => {

    const { height, width } = useWindowDimensions();
    const windowH = height;
    const windowW = width;
    const [viewH, setViewH] = useState(0);
    const [viewW, setViewW] = useState(0);
    const [invalid, setInvalid] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [cancelAnimation, setCancel] = useState(false);
    const [triggerAnimation, setTrigger] = useState(false)
    const [scanned, setScanned] = useState(false);
    const [getExhibitID, setExhibitID]= useState('')


    const viewMinX = (windowW - viewW) / 2;
    const viewMinY = (windowH - viewH) / 2;
    
    function goHome() {
        //console.log("pressed!", height, width, "View", viewH, viewW);
        navigation.replace('Home');
    }

    function setDimensions(h,w) {
        setViewH(h);
        setViewW(w);

    }

    function resetScan() {
            //console.log("bruhhh")
            setScanned(false);
            setTrigger(false)
        
    }

   
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        const backAction = () => {
        navigation.replace("Home")
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
      }, []);



    const handleBarCodeScanned = ({ type, data, bounds }) => {
        const { x, y } = bounds.origin;
       let exhibitID;
        
        
        if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + viewW / 2) && y <= (viewMinY + viewH / 2) && bounds.size.height > 150) {

            if(!data.includes("qrdocent.com/qr/")) {
                setInvalid(true);
                setCancel(true)

            }else {
                let temp = data.split("qrdocent.com/qr/");
                exhibitID = temp[temp.length -1]
                setExhibitID(exhibitID)
                setInvalid(true);
                setCancel(false)
                //findExhibit(exhibitID);
    
            }
            //console.log(bounds);
            setTrigger(true);
            setScanned(true);
           
            
          // data - what is scanned
          
          
            
        } else {
            setScanned(false);
            setCancel(true);
            
        }
    };

    async function findExhibit (exhibitID) {
        await refreshToken(navigation, false);

        return getToken().then(tokenValue => {

            if (tokenValue.accessToken == null) {
                navigation.navigate("SignIn")
            }
            else {
                const exhibitJSON = JSON.stringify({
                    exhibitID: exhibitID,
                  })

                
                  console.log(exhibitID)

                try {
                    return axios({

                        method: 'post',
                        url: 'https://qrdocent.com/api/createMuseumUserScan',
                        data: exhibitJSON,
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${tokenValue.accessToken}`
                        }

                    }).then(res => {
                        console.log(res.data)
                        if (res.data.success == false && !res.data.message.includes("already exists")) {
                            setInvalid(true)
                            setCancel(false)
                            console.log(res.data)
                            console.log("DIDNT WORK")
                            return false;
                            
                        }
                        else {
                            console.log(res.data);
                            setCancel(true)
                            console.log("WORKED")
                            navigation.replace('Home')
                            return true;                         
                        }


                    }).catch(err => console.log(err))
                } catch (err) {
                    console.log(err)
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    }

  

    // if (hasPermission === null) {
    //     return <Text>Requesting for camera permission</Text>;
    // }
    // if (hasPermission === false) {
    //     return <Text>No access to camera</Text>;
    // }

    

    return (
        <View>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: "100%", width: "100%" }}
                bar

            >
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <Header goHome={goHome} navigation={navigation} showSettings={true}/>

                    {hasPermission === null ? 
                    <View style={{backgroundColor:"black", flex:0.775}}/>:
                    hasPermission === false ? 
                    <View style={{backgroundColor:"black", flex:0.775, justifyContent:"center", alignItems:"center"}}><Text style={{color:"white", textAlign:"center", textTransform:"uppercase"}}>{"SETTINGS > PRIVACY > CAMERA \n \n to give Qr Docent access to camera."} </Text></View>:
                    <QRscanner scanned={triggerAnimation} setDimensions={setDimensions} invalid={invalid} reset={resetScan} findExhibit={findExhibit} exhibitID={getExhibitID} cancel={cancelAnimation}/>}
               
                    <View style={styles.footer}>
                        <Button icon="keyboard-return" color="white" raised labelStyle={{ fontSize: 43, textAlign: "center" }} style={styles.backButton} onPress={goHome}></Button>
                    </View>
                </View>
            </BarCodeScanner>
            {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex: 0.11,
        backgroundColor: "#282B33",
        justifyContent: "center",
        alignItems: "center"
    },
    backButton: {
        width: 150,
        borderRadius: 23
    }
})



export default QRScreen;