import React, { useState, useEffect } from "react";
import { IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Video from "./Components/Video";
import ExternalLink from "./Components/ExternalLink";
import StoryCard from "./Components/StoryCard";
import StoryCardAlt from "./Components/StoryCardAlt";
import SongCard from './Components/SongCard';
 

import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    StyleSheet,
    BackHandler
} from "react-native";

const ExhibitScreen = ({ route, navigation }) => {
    const [bioHeight, setBioHeight] = useState(191);
    const fixed = {
        width: "100%",
        height: 300,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

    useEffect(()=>{
        return ()=> setBioHeight(0)
    },[])

    useEffect(() => {
        const backAction = () => {
        navigation.replace("Home")
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
      }, []);


    const contents = route.params.data.contents.map((data, index)=>{
        switch(data.contentTypeID) {
            case 1:
                return <View key={index}><StoryCardAlt src={data}/></View>
            case 2: 
                return <View key={index}><Video src={data.URL} description={data.description}/></View>
            case 3:
                return <View key={index}><SongCard src={data} name={route.params.data.name}/></View>
            case 4:
                return <View key={index}><ExternalLink src={data}/></View>
        }
    })
    const bio = {
        height: bioHeight,
        margin: 15,
        minHeight: 191,
        paddingLeft:15,
        marginHorizontal: 25,
        overflow:"hidden",
        alignItems:"flex-start",
        width:"100%"


    }

    function goHome() {
        navigation.replace("Home");
    }

    function seeBio() {

        if (bioHeight === 191) {
            setBioHeight("auto")
        }
        else {
            setBioHeight(191)
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: route.params.data.mainImage }} style={{ ...fixed }}>

            </ImageBackground>
            <IconButton
                style={styles.button}
                icon="arrow-left"
                color="white"
                size={35}
                onPress={goHome}
            />

            <ScrollView style={styles.scrollView} bounces="false">


                <View style={{ height: 300, width: "100%", justifyContent: "flex-end", paddingTop: 30, }}>

                    <Text style={styles.name}>{route.params.data.name}</Text>
                </View>
                <View style={{ backgroundColor: '#282B33', alignItems:"center", width:"100%" }}>
                    <TouchableOpacity style={bio} onPress={seeBio} activeOpacity={1}>
                        <Text style={styles.heading}>Bio</Text>
                        <Text style={styles.text}>
                            {route.params.data.description}
                        </Text>
                       {bioHeight === 191 && <LinearGradient
                            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                            start={{ x: 0.0, y: 0.4 }}
                            end={{ x: 0.0, y: 0.7 }}
                            locations={[0.0, 0.9]}
                            colors={['#282B3340', '#282B33f0']} //<-- last 2 chars from color control the opacity
                            useViewFrame={false}
                            style={fixed} />
                            }
                    </TouchableOpacity> 



                    {contents}
                    
                    {/* <Video src={route.params.data.videoLink}/>
                    <ExternalLink />
                    <StoryCard src={route.params.data.videoLink}/>
                    <StoryCardAlt src={route.params.data.videoLink}/> */}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282B33',
        alignItems:"center",
        justifyContent:"center",
        width:"100%"

    },
    scrollView: {
        flex: 1,
        width:"100%",
    },
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
    },
    name: {
        color: "white",
        fontSize: 34,
        textTransform: "uppercase",
        fontWeight: "bold",
        marginLeft: 18,
        marginBottom: 5
    },
    text: {
        fontSize: 20,
        lineHeight: 25,
        color: "white"
    },
    heading: {
        fontSize: 26,
        color: "white",
        marginBottom: 10,
        marginTop: 1,
        alignSelf:"flex-start"
        
    }
});

export default ExhibitScreen;
