import React, { useEffect, useState } from "react";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,

} from 'react-native-reanimated';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

import PlayIcon from "../Buttons/PlayIcon";
import InfoIcon from "../Buttons/InfoIcon";
import axios from "axios";

const Video = (props) => {
  const [result, setResult] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const fadeText = useSharedValue(0)
  const displayText = useSharedValue('flex')
  const fadeImage = useSharedValue(1)
  const fadeImage2 = useSharedValue(1)


  const aStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeText.value,
    }
  })

  const aStyle2 = useAnimatedStyle(() => {
    return {
      opacity: fadeImage.value,
      display: displayText.value

    }
  })

  const aStyle3 = useAnimatedStyle(() => {
    return {
      opacity: fadeImage2.value,
      display: displayText.value
    }
  })

  const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity)
  const AnimatedTouchNoFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback)


  function fadeOut() {

    fadeText.value = withTiming(1, { duration: 1000 })
    displayText.value = "none"
    fadeImage.value = withTiming(0, { duration: 1000 })
    fadeImage2.value = withTiming(0, { duration: 1000 })



  }
  function fadeIn() {
    fadeText.value = withTiming(0, { duration: 1000 })
    fadeImage.value = withTiming(1, { duration: 1000 })
    fadeImage2.value = withTiming(1, { duration: 1000 })

    displayText.value = "flex"
  }
  let videoID;

  /* Get the video ID from the youtube link */
  if (props.src.includes("youtube.com")) {
    let arr = props.src.split("v=");
    videoID = arr[1].split("&")[0];
    checkImage();
  } else if (props.src.includes("youtu.be")) {
    let arr = props.src.split("be/");
    videoID = arr[1].split("&")[0];
    checkImage();
  }

  const _handleOpenWithLinking = () => {
    try {

      Linking.openURL("youtube://www.youtube.com/v/" + videoID).catch(() => {
        _handlePressButtonAsync()

      }
      )

    } catch (err) {
    }
  };

  async function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    return http.send();
    http.status != 404;

  }


  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(encodeURI("https://www.youtube.com/watch?v=" + videoID));
    setResult(result);
  };

  //  let http = new XMLHttpRequest();
  //   await http.open('HEAD', "https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg", false);
  //  http.send();
  //  http.status!=404;

  async function checkImage() {
    try {
      let imageRes = await axios.get("https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg").catch((err) => {})
      console.log(imageRes.status)
      setImageURL("https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg")

    } catch (err) {
      setImageURL("https://img.youtube.com/vi/" + videoID + "/hqdefault.jpg")
    }
  }



  // if( await UrlExists("https://img.youtube.com/vi/" + videoID + "/maxresdefault.jpg")){
  //   console.log("YEEEEERRRRR")
  // }

  // Get the youtube link thumbnail
  const image2 = {
    uri: "https://img.youtube.com/vi/" + videoID + "/hqdefault.jpg",
  };

  const image = {
    uri: imageURL,
  };




  return (
    <AnimatedTouchNoFeedback onPress={fadeIn}>
      <View style={[styles.container]}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          imageStyle={styles.image}
          style={styles.imageContainer}
        >


          {/* <Animated.View style={[aStyle2, { flexDirection: "row",  width:150, height:60}]}>  */}
          {/* <TouchableOpacity style={{backgroundColor:"blue", alignItems:"center", justifyContent:"center", flexDirection:"row", width:150, height:60}}> */}
            <AnimatedTouch onPress={_handleOpenWithLinking} style={[{zIndex:999}, aStyle3]}>
              <PlayIcon style={{ marginRight: 25 }} />
            </AnimatedTouch>


            <AnimatedTouch  style={[{zIndex:1},aStyle2]} onPress={fadeOut}>
              <InfoIcon />
            </AnimatedTouch>
            {/* </TouchableOpacity> */}
            {/* </Animated.View>  */}

          <Animated.View style={[styles.content, aStyle]}>
            <Text style={[styles.desc]}>
              {props.description}
            </Text>
          </Animated.View>

        </ImageBackground>
      </View>
    </AnimatedTouchNoFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.8,
    height: (Dimensions.get("window").width * 0.8 * 0.878),
    borderRadius: 20,
     
    maxHeight: 454,
    maxWidth: 525,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 17.5,
    marginBottom: 17.5,
    zIndex:-1
  },
  image: {
    borderRadius: 20,
    opacity: 0.45,
    width: "100%",
    height: "100%",

  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  content: {
    width: 304,
    height: 267,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    padding: 25,
  },
  desc: {
    color: "white",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "bold",
    position: "absolute",
    top: 54,
    left: 21,
  },
});

export default Video;
