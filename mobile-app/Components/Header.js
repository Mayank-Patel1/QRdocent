import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';

const Header = (props) => {

    const [settings, setSettings] = useState(props.showSettings ? true : false);
    return (
        <View style={styles.header} >
            <View style={styles.headerLogo}>
                <Button onPress={props.goHome} contentStyle={{width:176, marginLeft:-13}}><Image source={require('../images/QRlogo.png')} style={{ width: 21, height: 21, tintColor:"white"}} tintColor="white"></Image>
                <Text style={{ color: 'white', fontFamily: 'System', fontSize: 20 }}>QR DOCENT</Text></Button>
            </View>
            { settings && <IconButton icon="cog-outline" color="white" raised labelStyle={{ fontSize: 25 }} style={styles.settingsButton} onPress={()=>console.log("go to settings")} />}
        </View>
    )

}

const styles = StyleSheet.create({
    header: {
        flex: 0.115,
        backgroundColor: "#282B33",
        alignItems: "flex-end",
        flexDirection: "row",
        justifyContent: "space-between"

    },
    headerLogo: {
        width: 140,
        height: "60%",
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    settingsButton: {
        width: 40,
        height: "50%",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 23
    },

})

export default Header;