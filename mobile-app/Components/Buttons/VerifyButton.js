import React from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const VerifyButton = (props) => {

    const styles = {
        container: {
            height: 47,
            width: 282,  
            borderRadius: 20, 
            alignItems: "center", 
            justifyContent: "center" 
        },
        text: {
            color: "white",
            fontSize: 16

        }
        
    }

    return (
        <View  style={{ borderRadius: 50 }}>
            <LinearGradient

                colors={['#614AD3', '#864AD3']}
                style={styles.container}>
                <Text style={styles.text}>VERIFY</Text>
            </LinearGradient>
        </View>
    )
}

export default VerifyButton;