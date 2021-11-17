import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity, StyleSheet} from 'react-native';
import QrLogo from '../../Components/SvgComponents/QrLogo';


function SplashScreen({navigation}) {
    

    useEffect(()=>{
            navigation.replace("Home")  
    },[])

    return (
        <>
        
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#282B33' }}>    
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    
    text: {
        fontSize: 35,
        color:"white",
        position:"absolute",
        top: "30%"
    }
})

export default SplashScreen;