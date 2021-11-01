import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import Header from '../Components/Header';
import QRscanner from '../Components/QRscanner';

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
    const viewMinX = (windowW - viewW) / 2;
    const viewMinY = (windowH - viewH) / 2;
    
    function goHome() {
        console.log("pressed!", height, width, "View", viewH, viewW);
        navigation.navigate('Home');
    }

    function setDimensions(h,w) {
        setViewH(h);
        setViewW(w);
    }

    function resetScan() {
            console.log("bruhhh")
            setScanned(false);
            setTrigger(false)
        
    }

   
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data, bounds }) => {
        const { x, y } = bounds.origin;
        if(!data.includes("qrdocent.com/qr")) {
            setInvalid(true);
        }
        if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + viewW / 2) && y <= (viewMinY + viewH / 2) && bounds.size.height > 150) {
            setCancel(false)
            console.log(bounds);
            setTrigger(true);
            setScanned(true);
           
            
          // data - what is scanned
          
          
            
        } else {
            setScanned(false);
            setCancel(true);
        }
    };

    function noCode () {
        setScanned(true);
            setCancel(true)
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: "100%", width: "100%" }}
                bar
            >
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <Header goHome={goHome} showSettings={true}/>

                    <QRscanner scanned={triggerAnimation} setDimensions={setDimensions} invalid={invalid} reset={resetScan} cancel={cancelAnimation}/>
               
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