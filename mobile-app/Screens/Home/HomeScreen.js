import React, { useEffect, useState, useRef } from "react";
import { Text, View, Alert, BackHandler } from "react-native";
import CameraButton from "./Buttons/CameraButton";
import ShowMeButton from "./Buttons/ShowMeButton";
import ScanningIcon from "./Icons/ScanningIcon";
import Header from "../../Components/Header";
import ScannedExhibits from "./Components/ScannedExhibits";
import axios from "axios";
import LoadingScreen from "../Loading/LoadingScreen";
import ErrorScreen from "../Error/ErrorScreen";
import { getToken, refreshToken } from "../../Authorize/authorize";

const HomeScreen = ({ route, navigation }) => {
  const [userScans, setUserScans] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const [count, setCount] = useState(1);
  const [exhibits, setExhibits] = useState();

  if (typeof route.params != "undefined") {
    if (route.params.alert && count == 1) {
      AlertBox(route.params.message);
      setCount(2);
    }
  }

// handling for physical back button on andriod devices
  useEffect(() => {
    const backAction = () => {
      Alert.alert("EXITTING", "EXIT QR DOCENT?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // fetch user Data
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const tokenValue = await getToken();

      if (tokenValue.accessToken == null) {
        navigation.replace("SignIn");
      } else {
        try {
          const httpResponse = await axios({
            method: "get",
            url: "https://qrdocent.com/api/getAllMuseumUserScans",
            headers: {
              authorization: `Bearer ${tokenValue.accessToken}`,
            },
          });
          if (httpResponse.data.success == false) {
            refreshToken(navigation, true);
            console.log(tokenValue);
          } else {
            console.log(tokenValue);
            setExhibits(httpResponse.data.result.scans);
            if (httpResponse.data.result.scans.length !== 0) {
              setUserScans(true);
            }
            setLoading(false);
          }
        } catch (err) {
          setTimeout(() => {
            setLoading(false);
            setConnectionError(true);
          }, 5000);
        }
      }
    } catch (err) {
      navigation.replace("SignIn");
    }
  }

  // triggered by camera button
  function goScan() {
    refreshToken(navigation, false);
    navigation.replace("QR Scanner");
  }
// triggered by show me how button
  function goHelp() {
    refreshToken(navigation, false);
    navigation.replace("Help");
  }
// triggered by settings button
  function goSettings() {
    refreshToken(navigation, false);
    navigation.replace("Settings");
  }
// Alert - if the generate playlist fails
  function AlertBox(message) {
    Alert.alert("Oh no! 😔", message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }
// show loading screen
  if (loading == true) {
    return <LoadingScreen />;
  }
// show connection error screen
  if (connectionError == true) {
    return <ErrorScreen navigation={navigation} />;
  }

  return (
    <View style={{ backgroundColor: "#282B33", flex: 1 }}>
      <Header
        goSettings={goSettings}
        navigation={navigation}
        showSettings={true}
      />

      {/* If the user hasn't scanned any QR codes */}
      {!userScans && <View style={{ flex: 0.085 }}></View>}
      {!userScans && (
        <View
          style={{
            flex: 0.4,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ScanningIcon
            style={{ stroke: "white" }}
            stroke="white"
            home={true}
          ></ScanningIcon>
          <Text
            style={{
              color: "white",
              fontFamily: "System",
              fontSize: 37,
              textAlign: "center",
            }}
          >
            SCAN A CODE TO {"\n"} GET STARTED.
          </Text>
          <ShowMeButton goHelp={goHelp} />
        </View>
      )}
      {/* If the User has scanned QR codes before */}
      {userScans && exhibits !== undefined && (
        <ScannedExhibits navigation={navigation} exhibits={exhibits} />
      )}

      {userScans && exhibits !== undefined ? (
        <View
          style={{
            flex: 0.15,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 40,
            borderRadius: 20,
          }}
        >
          <CameraButton goScan={goScan} size={90} borderRadius={44} />
        </View>
      ) : (
        <View
          style={{
            flex: 0.4,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 40,
            borderRadius: 15,
          }}
        >
          <CameraButton goScan={goScan} size={90} borderRadius={44} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
