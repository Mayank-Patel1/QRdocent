import React from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MusicIcon from './SvgComponents/MusicIcon';

const Generate = (props) => {

    const styles = {
        container: {
            marginTop: 20,
            height: 47,
            width: 205,  
            borderRadius: 20, 
            alignItems: "center", 
            justifyContent: "center",
            flexDirection:"row" 
        },
        text: {
            color: "white",
            fontSize: 13
        }
        
    }

    return (
        <TouchableOpacity  style={{ borderRadius: 50 }} onPress={props.goHelp} disabled={props.disable}>
            <LinearGradient
                colors={['#614AD3', '#864AD3']}
                style={styles.container}>
                    <MusicIcon/>
                <Text style={styles.text}>  GENERATE PLAYLIST</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Generate;