import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, useWindowDimensions, Alert, Vibration } from 'react-native';
import ScanLight from './ScanLight';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withRepeat,
    cancelAnimation
} from 'react-native-reanimated';

const QRscanner = (props) => {
    const [scanHeight, setHeight] = useState(0);
    const [invalidText, setInvalidText] = useState(false)
    const color = useSharedValue("white");

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            borderColor: color.value
        }
    }, []);

    const reanimatedStyle2 = useAnimatedStyle(() => {
        return {
            color: color.value
        }
    }, []);

    

    async function invalidCode () {

        if(props.cancel == false) {
            let result = await props.findExhibit(props.exhibitID);
        console.log(result)

        if(result == true){
            
                //setInvalidText(false);
                //props.reset()
           
            return;
        }
        }
        
            

        color.value = withRepeat(withTiming("red", {duration: 200}),8,true);
        Vibration.vibrate([0,600]);

        setInvalidText(true);
        
        setTimeout(()=>{
            setInvalidText(false);
            props.reset()
        },3000)

        //console.log("hi")
    }

    return (
        <>
        
        <View style={styles.scanner}>
            <View style={styles.scannerTop}></View>
            <View style={styles.scannerMiddle}>
                <View style={styles.scannerLeft}></View>
                <Animated.View
                    style={[{ ...styles.scannerBox, borderColor: "white" }, reanimatedStyle]}
                    onLayout={(event) => {
                        var { x, y, width, height } = event.nativeEvent.layout;
                        props.setDimensions(height, width);
                        setHeight(height);
                       // console.log(x, y, height, width, "yoooo")
                    }
                    }>
                        
                </Animated.View>
                <View style={styles.scannerLeft}></View>
            </View>
            <View style={styles.scannerBottom}>
                <Animated.Text style={[{ color: 'white', fontFamily: 'System', fontSize: 20, width: 240, textAlign: "center" },reanimatedStyle2]}>{ !invalidText ? "CODE MUST BE FULLY WITHIN GUIDE" : "INVALID CODE!"}</Animated.Text>
            </View>
        </View>
        {scanHeight > 0 ? <ScanLight codeFound={props.scanned} height={scanHeight} invalid={props.invalid} invalidCode={invalidCode} /> : <></>}
        </>
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
        borderRadius: 0,
    },
    scannerTop: {
        flex: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    scannerBottom: {
        flex: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: "center",
        justifyContent: "center",
    },
    scannerMiddle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    scannerLeft: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',   
        width: "10%",
        height: "100%",
        
    }
})
export default QRscanner;