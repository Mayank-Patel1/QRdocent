import React from "react";
import { View, Text, Dimensions } from "react-native";
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { storeSpotify, storeToken } from '../../Authorize/authorize'
import Help from "./Components/Help";

function SettingsScreen({ navigation }) {

    const styles = {
        button: {
            width: 50,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            marginTop: 50,
            marginLeft: 13,
            backgroundColor: "#2F333C"
        }
    }
    function goHome() {
        navigation.navigate("Home");
    }

    async function disconnectSpotify() {
        try {
            await WebBrowser.openAuthSessionAsync(encodeURI("http://accounts.spotify.com"));
            // console.log(result)
            // let { path, queryParams } = Linking.parse(result.url);
            // console.log(queryParams )
            // storeSpotify(queryParams, '@spotify_token')
            // setResult(result);

            storeSpotify(null, '@spotify_token');
        }
        catch (err) {
            console.log(err)
        }
    }

    function logOut() {
        storeToken(null)
        navigation.replace("LogIn")
    }

    return (
        <View style={{ backgroundColor: '#282B33', flex: 1, justifyContent: "center", alignItems: "center" }}>
            <IconButton
                style={styles.button}
                icon="arrow-left"
                color="white"
                size={35}
                onPress={goHome}
            />
            <View style={{width:Dimensions.get("window").width * 0.67, maxWidth:360, marginBottom:12.5}}>
            <Text style={{
                color:"white",
                fontSize:23,
                fontWeight:"bold",
                alignSelf:"flex-start"
            }}>HOW TO</Text>
            </View>
            <Help />

            <Button
                mode="outlined"
                color="white"
                style={{ width: 260, height: 40, borderColor: "#2F333C", marginBottom: 25, borderRadius: 20, borderWidth:3 }}
                contentStyle={{ alignItems: "center" }}
                onPress={disconnectSpotify}
            >
                DISCONNECT SPOTIFY
            </Button>

            <Button
                mode="outlined"
                color="red"
                style={{ width: 260, height: 40, borderColor: "rgba(255, 0, 0, 0.3)", borderRadius: 20, borderWidth:3 }}
                contentStyle={{ alignItems: "center" }}
                onPress={logOut}
            >
                LOG OUT
            </Button>


        </View>
    )
}

export default SettingsScreen;