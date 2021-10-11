import React, { useState } from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MusicIcon from '../SvgComponents/MusicIcon';
import MusicModal from '../MusicModal';

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

    function showMusicModal () {
        console.log("CLICK")
        setShowModal(true);
    }

    function hideModal () {
        console.log("CLICK")
        setShowModal(false);
    }

    return (
        <>
        <MusicModal show={showModal} hide={hideModal}></MusicModal>
        <TouchableOpacity  style={{ borderRadius: 50 }} onPress={showMusicModal} disabled={props.disable}>
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