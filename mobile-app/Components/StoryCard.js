import React from "react";
import YouTube from 'react-native-youtube';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text
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

const StoryCard = (props) => {

 

  // Get the youtube link thumbnail
  const image = { uri: "https://d11mgq5hlnsdgo.cloudfront.net/370bc732-a2d5-4619-8383-b00a14b92557.jpg" }
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" imageStyle={styles.image} style={styles.imageContainer}>
        
      </ImageBackground>

      <View style={styles.content}>
          <Text style={styles.desc}>After turning 18, Franklin confided to her father that she aspired to follow Sam Cooke
               in recording pop music, and moved to New York.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 304,
    height: 319,
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
    width:"100%",
    height:"100%",    
  },
  imageContainer: {
    width: 304,
    height: 310,
    borderRadius: 20,
    position:"absolute",
    top:0,
    
  },
  content:{
    width: 304,
    height: 160,
    borderRadius: 20,
    backgroundColor:"#2F333C",
    position:"absolute",
    bottom:0,
    padding:15,
    paddingTop:25
  },
  desc: {
    color:"white",
    fontSize:17,
    lineHeight:23,

    
},
});

export default StoryCard;
