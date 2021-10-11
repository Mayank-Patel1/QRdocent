import React from "react";
import YouTube from 'react-native-youtube';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  IconButton,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import CameraIcon from "./SvgComponents/CameraIcon";
import PlayIcon from "./SvgComponents/PlayIcon";
import InfoIcon from "./SvgComponents/InfoIcon";
import ExternalLinkIcon from "./SvgComponents/ExternalLinkIcon";


const ExternalLink = (props) => {


    const url = new URL("https://www.arethafranklin.net/")
    let link;
    if(url.hostname.includes("www.")) {
        link = url.hostname.replace("www.","");
    }
    else{
        link = url.hostname;
    }


    

  // Get the youtube link thumbnail
  
  return (
      <TouchableOpacity>
    <View style={styles.container}>
      <Text style={styles.title}>{link}</Text>
      <Text style={styles.desc}>Learn more about by clicking on this link</Text>
      <ExternalLinkIcon style={styles.icon}/>


    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 304,
    height: 74,
    borderRadius: 20,
    backgroundColor:"#2F333C",
    justifyContent: "center",
    paddingLeft:20,
    paddingRight:57,
    flexDirection: "column",
    marginTop: 17.5,
    marginBottom: 17.5,
  },
  title:{
      color:"white",
      fontWeight:"bold",
      fontSize:22,
  },
  desc: {
      color:"white",
  },
  icon:{
      position:"absolute",
      right:27.6
  }
  
});

export default ExternalLink;
