import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import Generate from './Generate';

const ScannedExhibits = (props) => {



    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>YOUR SCANS</Text>
                <Button style={styles.clearButton} icon="close" contentStyle={{height:"100%", width:"100%"}} labelStyle={styles.clearText}>clear</Button>
            </View>
            <View
                style={{
                    flex: 0.40,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    

                }}>
                    <Generate/>
            </View>

        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 0.085, 
         
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end",
        paddingLeft: 20,
        paddingRight: 20

    },
    title: {
        color:"white",
        fontSize:28,
        fontWeight:"bold",
        fontStyle:"normal"

    },
    clearButton: {
        width:89,
        height:36,
        borderRadius:20,
        backgroundColor:"#2F333C"
    },
    clearText: {
        color: "white",
        fontSize:13

    }
})

export default ScannedExhibits;