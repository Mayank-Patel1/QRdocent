import React, {useState}from "react";
import { URL, URLSearchParams } from "react-native-url-polyfill";
import * as WebBrowser from 'expo-web-browser';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import ExternalLinkIcon from "../Buttons/ExternalLinkIcon";

const ExternalLink = (props) => {
  const [result, setResult] = useState(null);

  const url = new URL(props.src.URL);
  let link;
  if (url.hostname.includes("www.")) {
    link = url.hostname.replace("www.", "");
  } else {
    link = url.hostname;
  }

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(`${props.src.URL}`);
    setResult(result);
  };

  return (
    <TouchableOpacity onPress={_handlePressButtonAsync}>
      <View style={styles.container}>
        <Text style={styles.title}>{link}</Text>
        <Text style={styles.desc}>
          {props.src.description}
        </Text>
        <ExternalLinkIcon style={styles.icon} />
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
    fontSize: 22,
  },
  desc: {
    color: "white",
  },
  icon: {
    position: "absolute",
    right: 27.6,
  },
});

export default ExternalLink;
