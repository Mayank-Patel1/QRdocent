import React, {useEffect, useState}from "react";
import { URL, URLSearchParams } from "react-native-url-polyfill";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import ExternalLinkIcon from "../Buttons/ExternalLinkIcon";
import axios from "axios";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { storeSpotify, getSpotify } from "../../../Authorize/authorize"
import SpotifyIcon from "../../Home/Icons/SpotifyIcon";


const SongCard = (props) => {
  const [result, setResult] = useState(null);
  const [songName, setSongName] = useState('')

  //const songID = "6ohzjop0VYBRZ12ichlwg5"

  const _openSpotify= (songID) => {
    try{
      Linking.openURL("spotify:track:"+songID).catch((err)=> {
        WebBrowser.openBrowserAsync(encodeURI("https://open.spotify.com/track/"+ songID))
      } 
      )
    }catch(err) {
        WebBrowser.openBrowserAsync(encodeURI("https://open.spotify.com/track/"+ songID))
    }
  };

  function test() {
    console.log(props.src.URL)
    let website = props.src.URL + ""
    let songID = website.split("track/")[1].split("?")[0]
    _openSpotify(songID)
    //WebBrowser.openBrowserAsync(encodeURI(props.src.URL))
  }

  

  return (
    <TouchableOpacity onPress={test}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.src.description}</Text>
        <Text style={styles.desc}>
        {props.name}
        </Text>
        <Image source={require('../../../images/Spotify_Icon_CMYK_White.png')} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.8,
    maxWidth: 525,
    height: 74,
    borderRadius: 20,
    
    backgroundColor: "#2F333C",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 57,
    flexDirection: "column",
    marginTop: 17.5,
    marginBottom: 17.5,
    
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  desc: {
    color: "white",
  },
  icon: {
    position: "absolute",
    right: 27.6,
    width:23,
    height:23
  },
});

export default SongCard;
