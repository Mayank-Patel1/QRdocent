import React from "react";

import { View, StyleSheet, ImageBackground, Text, TouchableWithoutFeedback, Dimensions} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
  
} from 'react-native-reanimated';

const StoryCardAlt = (props) => {
  const fadeText = useSharedValue(0)
  const fadeImage = useSharedValue(1)

  const aStyle = useAnimatedStyle(()=> {
    return {
      opacity: fadeText.value
    }
  })

  const aStyle2 = useAnimatedStyle(()=> {
    return {
      opacity: fadeImage.value
    }
  })

  function fade(){
    if(fadeText.value == 0) {
      fadeText.value = withTiming(1,{duration:1000})
      fadeImage.value = withTiming(0.45,{duration:1000})
    }
    else {
      fadeText.value = withTiming(0,{duration:1000})
      fadeImage.value = withTiming(1,{duration:1000})

    }
  }
  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground)
  // Get the youtube link thumbnail
  const image = {
    uri: props.src.URL,
  };

  return ( 
    <Animated.View style={styles.container}>
      <AnimatedImage
        source={image}
        resizeMode="cover"
        imageStyle={[styles.image]}
        style={[styles.imageContainer,aStyle2]}
      >
        <View style={[{width:"100%", height:"100%", backgroundColor:"black", borderRadius:20, opacity:0}, aStyle2]}>

        </View>
      </AnimatedImage>
      <TouchableWithoutFeedback onPress={fade}>
      <Animated.View style={[styles.content, aStyle]}>
        <Text style={[styles.desc]}>
          {props.src.description}
        </Text>
      </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.8,
    height: (Dimensions.get("window").width * 0.8 * 0.878),
    maxHeight:454,
    maxWidth: 525,
    borderRadius: 20,
    
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 17.5,
    marginBottom: 17.5,
    overflow:"hidden"
  },
  image: {
    borderRadius: 20,
    opacity: 1,

  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overlayColor: '#282B33',
  },
  content: {
    width: "100%",
    height: "100%",
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

export default StoryCardAlt;
