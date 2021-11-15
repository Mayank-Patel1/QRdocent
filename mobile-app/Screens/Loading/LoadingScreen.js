import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity, StyleSheet} from 'react-native';
import ScanningIcon from '../Home/Icons/ScanningIcon';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withRepeat
} from 'react-native-reanimated';


function LoadingScreen() {
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
            <ScanningIcon style={{ stroke: "white" }} stroke="white" home={false}>
            <Animated.View style={[styles.line, reanimatedStyle]}></Animated.View>
            </ScanningIcon>
            <Text style={styles.text}>LOADING...</Text>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    line: {
        backgroundColor:"white",
        width:70,
        height:4,
        position:"relative",
        top:15,
        alignSelf:"center"
    },
    text: {
        fontSize: 20,
        color:"white",
        position:"relative",
        bottom: 200
    }
})

export default LoadingScreen;