import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    withSpring,
    withRepeat,
    runOnJS,
    cancelAnimation
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

// import DropShadow from "react-native-drop-shadow";

//const AnimatedDropShadow = Animated.createAnimatedComponent(DropShadow)


function ScanLight(props) {
    const progress = useSharedValue(0);
    const move = useSharedValue(-props.height / 2);
    const fade = useSharedValue(0);
    const [triggerInvalid, setTrigger] = useState(false)
    const [codeFound, setCodeFound] = useState(props.codeFound)

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: fade.value,
            transform:[
               
                {
                    translateY: move.value
                }
            ]
            
        }
    }, []);


   

    useEffect(()=> {
        if (props.codeFound) {
            startScan();
        }
    },[props.codeFound])

    useEffect(()=> {
        if (props.cancel) {
            cancelAnimation(progress)
            cancelAnimation(move)
            cancelAnimation(fade)
        }
    },[props.cancel])

  /*

   move.value = withTiming(
            (-props.height / 2),{duration: 0},
            (done)=>  {
                if(done) 
                    return fade.value = withTiming(
                        1, 
                        {duration: 0},
                        ()=>
                        move.value = withRepeat(
                            withTiming(props.height / 2, {duration: 1700}),
                            2,
                            true,
                            (done)=>{
                                if (done)
                                    return fade.value = withTiming(
                                        0,
                                        {duration: 500},
                                        (done)=> {
                                            'worklet';
                                            if(done && props.invalid) {
                                                runOnJS(props.invalidCode)()
                                            }
                                        })
                            }) 
                        ) 
            
        
        
        })
  */


    

    function startScan () {
        progress.value = withSpring(1);
        fade.value = withSpring(1);
        move.value = withRepeat(
            withTiming(props.height / 2, {duration: 1500}),
            2,
            true,
            (done)=>{
                if (done)
                    return fade.value = withTiming(
                        0,
                        {duration: 500},
                        (done)=> {
                            'worklet';
                            if(done && props.invalid) {
                                runOnJS(props.invalidCode)()
                            }
                        })
            })
    }

    function finishScan () {
        progress.value = withSpring(0);
    }

    const lineStyle = {
        width: "93%",
        height: 11
        ,
        
        position: "absolute",
        top: "50%",
        left: "3.5%",
        right: 0,
        shadowColor: '#614AD3',
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation:4,
        

    }

    return (
        <Animated.View style={[lineStyle, reanimatedStyle]}>

            <LinearGradient
            start={{ x: 0.0, y: 0 }}
            end={{ x: 0.0, y: 1 }}
            locations={[0.0, 0.4,0.6,0.8,1]}
                colors={[
                    "rgba(97, 74, 211, 0.1)",
                    "rgba(97, 74, 211, 0.8)",
                    "rgba(255, 255, 255, 0.5)",
                    '#614AD3',"rgba(97, 74, 211, 0.1)"
                ]}
                style={{height:"100%", width:"100%"}}>
            
            </LinearGradient>
            
        </Animated.View>

)
     
}

// const styles = StyleSheet.create({
//     line:{
//         position:""
//     }
// })
export default ScanLight;