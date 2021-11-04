import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';
import ScanningIcon from '../Home/Icons/ScanningIcon';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withRepeat
} from 'react-native-reanimated';


function ErrorScreen(props) {
    const move = useSharedValue(0);

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            transform:[
                {
                    translateY: move.value
                }
            ]
        }
    }, []);

    useEffect(()=>{
        move.value = withRepeat(withTiming(65, {duration: 1500}), -10, true)
    },[])

    return (
        <>
        
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#282B33' }}>
            <ScanningIcon style={{ stroke: "#2F333C" }} stroke="#2F333C" home={false}>
            <View style={styles.line }></View>
            <View style={styles.line2 }></View>

            </ScanningIcon>
            <Text style={styles.text}>CONNECTION ERROR</Text>
            <Button mode="outlined" color="white" style={styles.button} onPress={()=>props.navigation.replace('Home')} labelStyle={styles.buttonContent}>RETRY</Button>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    line: {
        backgroundColor:"#2F333C",
        width:50,
        height:4,
        position:"relative",
        top:47,
        alignSelf:"center",
        transform: [{ rotateZ: "-45deg" }]
    },
    line2: {
        backgroundColor:"#2F333C",
        width:50,
        height:4,
        position:"relative",
        top:45,
        alignSelf:"center",
        transform: [{ rotateZ: "45deg" }]
    },
    text: {
        fontSize: 20,
        color:"white",
        position:"relative",
        bottom: 200
    },
    button:{
        fontSize: 20,
        color:"white",
        position:"relative",
        top: 60,
        borderColor:"white"
    },
    buttonContent: {
        fontSize: 20,

    }
})

export default ErrorScreen;