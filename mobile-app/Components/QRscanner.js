import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

const QRscanner = (props) => {

    




        return (
            <View style={styles.scanner}>
                <View style={styles.scannerTop}></View>
                <View style={styles.scannerMiddle}>
                    <View style={styles.scannerLeft}></View>
                    <View
                        style={{ ...styles.scannerBox, borderColor: props.scanned ? "green" : "white" }}
                        onLayout={(event) => {
                            var { x, y, width, height } = event.nativeEvent.layout;
                            //setViewH(height);
                            //setViewW(width);
                            props.setDimensions(height, width);
                        }
                        }></View>
                    <View style={styles.scannerLeft}></View>
                </View>
                <View style={styles.scannerBottom}>
                    <Text style={{ color: 'white', fontFamily: 'System', fontSize: 20, width: 240, textAlign: "center" }}>CODE MUST BE FULLY WITHIN GUIDE</Text>
                </View>
            </View>
        )

}

    const styles = StyleSheet.create({
        scanner: {
            flex: 0.775
        },
        scannerBox: {
            borderWidth: 5,
            borderColor: "white",
            height: "100%",
            width: "80%",
            //boxSizing: "border-box",
            borderRadius: 0,
        },
        scannerTop: {
            flex: 0.5,
            opacity: 0.5,
            backgroundColor: "black"
        },
        scannerBottom: {
            flex: 0.5,
            opacity: 0.5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black"
        },
        scannerMiddle: {
            flex: 1,
            opacity: 0.5,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        },
    
        scannerLeft: {
            flex: 1,
            opacity: 1,
            backgroundColor: "black",
            width: "10%",
            height: "100%"
        }

    })

    export default QRscanner;