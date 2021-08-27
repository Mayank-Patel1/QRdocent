import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

const QRScreen = ({ navigation }) => {

    function goHome() {
        console.log("pressed!");
        navigation.navigate('Home')


    }

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
           // const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        //const {x, y} = origin;
        console.log(BarCodeScanner.BarCodePoint);
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    BarCodeScanner

    return (
        <View>


            {/* <Camera style={styles.camera}> */}
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: "100%", width: "100%" }}
                bar

            >
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View style={styles.header}>
                        <View style={styles.headerLogo}>
                            <Image source={require('../images/image4.png')} style={{ width: 20, height: 20 }}></Image>
                            <Text style={{ color: 'white', fontFamily: 'System', fontSize: 20 }}>QR DOCENT</Text>
                        </View>
                        <Button icon="cog-outline" color="white" raised labelStyle={{ fontSize: 25}} style={styles.settingsButton} onPress={goHome}></Button>
                    </View>
                    <View style={styles.scanner}>
                        <View style={styles.scannerTop}></View>
                        <View style={styles.scannerMiddle}>
                            <View style={styles.scannerLeft}></View>
                            <View style={styles.scannerBox}></View>
                            <View style={styles.scannerLeft}></View>
                        </View>
                        <View style={styles.scannerBottom}>
                        <Text style={{ color: 'white', fontFamily: 'System', fontSize: 20, width:240, textAlign:"center" }}>CODE MUST BE FULLY WITHIN GUIDE</Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Button icon="keyboard-return" color="white" raised labelStyle={{ fontSize: 43, textAlign: "center" }} style={styles.backButton} onPress={goHome}></Button>
                    </View>
                </View>

            </BarCodeScanner>
            {/* </Camera> */}


            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
}

const styles = StyleSheet.create({
    camera:{
        height:"100%",
        width:"100%"
    },
    header: {
        flex: 0.115,
        backgroundColor: "#282B33",
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent:"space-between"

    },
    headerLogo:{
        width:140,
        height:"60%",
       marginLeft:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    settingsButton:{
        width:40,
        height:"60%",
      
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius: 23
    },
    scanner: {
            flex: 0.775
    },
    scannerBox: {
        borderWidth: 5,
        borderColor:"white",
        height:"100%",
        width:"80%",
        //boxSizing: "border-box",
        borderRadius: 0,
    },
    scannerTop:{
        flex:0.5,
        opacity:0.5,
        backgroundColor:"black"
    },
    scannerBottom:{
        flex:0.5,
        opacity:0.5,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"black"
    },
    scannerMiddle:{
        flex:1,
        opacity:0.5,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    },

    scannerLeft:{
        flex:1,
        opacity:1,
        backgroundColor:"black",
        width:"10%",
        height:"100%"
    },
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