import React from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const ShowMeButton = (props) => {

    const styles = {
        container: {
            height: 47,
            width: 155,  
            borderRadius: 20, 
            alignItems: "center", 
            justifyContent: "center" 
        },
        text: {
            color: "white",

        }
        
    }

    return (
        <TouchableOpacity  style={{ borderRadius: 50 }} onPress={props.goHelp}>
            <LinearGradient

                colors={['#614AD3', '#864AD3']}
                style={styles.container}>
                <Text style={styles.text}>SHOW ME HOW</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default ShowMeButton;