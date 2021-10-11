import React from "react";
import YouTube from 'react-native-youtube';

import {
  View,
  StyleSheet,
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

const Video = (props) => {

  let videoID;
  
  /* Get the video ID from the youtube link */
  if(props.src.includes("youtube.com")) {
    let arr = props.src.split("v=")
    videoID = arr[1].split("&")[0]
    console.log(videoID)
  }
  else if (props.src.includes("youtu.be")) {
    let arr = props.src.split("be/")
    videoID = arr[1].split("&")[0]
    console.log(videoID)
  }

  // Get the youtube link thumbnail
  const image = { uri: "https://img.youtube.com/vi/"+videoID+"/maxresdefault.jpg" }
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" imageStyle={styles.image} style={styles.imageContainer}>
        <TouchableOpacity >
          <PlayIcon style={{ marginRight: 25 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <InfoIcon />
        </TouchableOpacity>
      </ImageBackground>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 304,
    height: 267,
    borderRadius: 20,
    backgroundColor:"black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 17.5,
    marginBottom:17.5
  },
  image: {
    borderRadius:20,
    opacity:0.45,
  },
  imageContainer: {
    width: 304,
    height: 267,
    borderRadius: 20,
    backgroundColor:"black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    
  }
});

export default Video;
