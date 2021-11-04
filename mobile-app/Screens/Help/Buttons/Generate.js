import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MusicIcon from '../Icons/MusicIcon';

const Generate = (props) => {
    const [showModal, setShowModal] = useState(false);

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
        <>
        
        <TouchableOpacity  style={{ borderRadius: 50 }} disabled={props.disable}>
            <LinearGradient
                colors={['#614AD3', '#864AD3']}
                style={styles.container}>
                    <MusicIcon/>
                <Text style={styles.text}>  GENERATE PLAYLIST</Text>
            </LinearGradient>
        </TouchableOpacity>
        </>
    )
}

export default Generate;