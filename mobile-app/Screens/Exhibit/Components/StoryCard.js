import React from "react";

import { View, StyleSheet, ImageBackground, Text } from "react-native";

const StoryCard = (props) => {
  // Get the youtube link thumbnail
  const image = {
    uri: props.src.URL,
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        imageStyle={styles.image}
        style={styles.imageContainer}
      ></ImageBackground>

      <View style={styles.content}>
        <Text style={styles.desc}>
          {props.src.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 304,
    height: 319,
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 17.5,
    marginBottom: 17.5,
  },
  image: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 304,
    height: 310,
    borderRadius: 20,
    position: "absolute",
    top: 0,
  },
  content: {
    width: 304,
    height: 160,
    borderRadius: 20,
    backgroundColor: "#2F333C",
    position: "absolute",
    bottom: 0,
    padding: 15,
    paddingTop: 25,
  },
  desc: {
    color: "white",
    fontSize: 17,
    lineHeight: 23,
  },
});

export default StoryCard;
