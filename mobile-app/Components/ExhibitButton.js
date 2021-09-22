import React from 'react';
import { Text, Image, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import MusicIcon from './SvgComponents/MusicIcon';

const ExhibitButton = (props) => {

    const styles = {
        container: {
            height: 47,
            width: "100%",  
            borderRadius: 20, 
            alignItems: "center", 
            justifyContent: "space-between",
            flexDirection:"row",
            height:"100%" 

        },
        text: {
            color: "white",
            fontSize: 24

        },
        settingsButton: {
            width: 40,
            height: "50%",
    
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            borderRadius: 23
        },
        
    }

    function goExhibit () {
        props.navigation.navigate('Exhibit',{data: props.data})
        console.log(props.data);
    }

   

    return (
        <TouchableOpacity  style={{ borderRadius: 20, width:"97%", backgroundColor:"#2F333C", height:74, marginBottom:15 }} onPress={goExhibit} disabled={props.disable}>
            <View

                
                style={styles.container}>
                    
                    <Image source={{uri: props.data.artistImage}} style={{ resizeMode: 'cover', width: 56, height: 57, borderRadius:20, marginLeft:10 }} />
                <Text style={styles.text}>  {props.data.name}</Text>
                <IconButton icon="chevron-right" color="white" raised labelStyle={{ fontSize: 25 }} style={styles.settingsButton}/>
            </View>
        </TouchableOpacity>
    )
}

export default ExhibitButton;