import React, { useState } from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MusicIcon from '../Icons/MusicIcon';
import MusicModal from '../Components/MusicModal';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { storeSpotify, refreshSpotifyToken } from "../../../Authorize/authorize";

const Generate = (props) => {
    const [showModal, setShowModal] = useState(false);
    let urlLink = false ? "http://192.168.1.155:8000/spotifyLogin" : "https://qrdocent.com/api/spotifyLogin"

    let callbackUrl = false ? "exp://192.168.1.155:19000" :"qrdocent://"


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



  const _handlePressButtonAsync = async () => {
    try {
        let result =  await WebBrowser.openAuthSessionAsync(encodeURI(urlLink), callbackUrl);
    let { path, queryParams } = Linking.parse(result.url);
    storeSpotify(queryParams, '@spotify_token')
    setResult(result);
    
    props.navigation.replace('Generate',{exhibits: props.exhibits})
    }
    catch(err){
    }
console.log("spotify")
    
  };

   async function refresh() {
    let result =  await refreshSpotifyToken(props.navigation, {exhibits: props.exhibits});

    if(result == false) {
        _handlePressButtonAsync()
    } 
  }


    return (
        <>
    
        <MusicModal show={showModal} hide={hideModal} navigation={props.navigation} exhibits={props.exhibits}></MusicModal>
        <TouchableOpacity  style={{ borderRadius: 50 }} onPress={refresh} disabled={props.disable}>
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