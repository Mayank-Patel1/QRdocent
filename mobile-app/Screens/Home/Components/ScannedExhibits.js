import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, View, StyleSheet, Dimensions, Alert, ScrollView, SafeAreaView,TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import Generate from '../Buttons/Generate';
import ExhibitButton from '../Buttons/ExhibitButton';
import axios from 'axios';
import { getToken, refreshToken } from '../../../Authorize/authorize';
import { SongContext } from '../../../Components/SongContext';



const ScannedExhibits = (props) => {
    const [exhibits, setExhibits] = useState(props.exhibits)
    const [outside, setOutside] = useState(false)
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const {songs, setSongs} = useContext(SongContext)


    function deleteExhibit(scanID) {
        getToken().then(tokenValue => {

            if (tokenValue.accessToken == null) {
                props.navigation.navigate("SignIn")
            }
            else {
                refreshToken(props.navigation, false);
                const data = {
                    scanID:scanID
                }
                axios({
                    method: 'POST',
                    url: 'https://qrdocent.com/api/deleteMuseumUserScan',
                    data: data,
                    headers: {
                        authorization: `Bearer ${tokenValue.accessToken}`
                    }
                }).then((res) => {
                    console.log(res.data)
                    console.log(scanID)

                    if(res.data.success == true) {
                        for(let i =0; i < exhibits.length; i++) {
                            if(exhibits[i].scanID == scanID) {
                                exhibits.splice(i, 1);
                                if(exhibits.length == 0) {
                                    props.navigation.replace("Home")
                                }
                                break;
                            }
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err)=>{
            props.navigation.navigate("LogIn")
        })
    }

   function outsideTap() {
       if(outside == false)
            setOutside(true)
        else
            setOutside(false)
    }

    
    //songsArray = [...songsArray[0]]
    useEffect(()=>{

        let songsArray = exhibits.map((exhibit, index)=>{
            return exhibit.contents.map((content, index)=>{
                if(content.contentTypeID == 3) {
                    return content.URL
                }
            })
        })
        songsArray = [].concat.apply([], songsArray);

    songsArray = songsArray.filter(song => song !== undefined)

    songsArray = songsArray.map(song=>{
        let songID = song.split("track/")[1].split("?")[0];
        return "spotify:track:" + songID
    })

    console.log(songsArray)
    songsArray = songsArray.map(song=>{
        if(!songs.includes(song)) {
            return song
        }
    })
    songsArray = songsArray.filter(song => song !== undefined)

    setSongs([...songs, ...songsArray])
    console.log(songs)

    },[])
     

    return (
        <>
        
        <View style={{ flex: 0.775, }}>
            <View style={styles.header}>
                <Text style={styles.title}>YOUR SCANS</Text>

                {/* <Button style={styles.clearButton} icon="close" contentStyle={{height:"100%", width:"100%"}} labelStyle={styles.clearText}>clear</Button> */}
            </View>
            <SafeAreaView style={styles.scans}>
                <ScrollView style={{ width: "100%", marginLeft: 12 }} bounces="false">
                
                

                    {
                        exhibits.map((exhibit, index) => {
                            return <View key={index}>
                                
                                <ExhibitButton data={exhibit} navigation={props.navigation} deleteExhibit={deleteExhibit} outside={outside}/>

                            </View>
                       

                        })
                    }
                    





                    <View
                        style={{
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: 'center',



                        }}>

                        <Generate navigation={props.navigation} exhibits={exhibits} />
                    </View>

                </ScrollView>
            </SafeAreaView>



        </View>

        </>
    )

}

const styles = StyleSheet.create({
    header: {
        flex: 0.12,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        borderRadius: 25,


    },
    scans: {
        flex: 0.88,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"



    },
    title: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        fontStyle: "normal"

    },
    clearButton: {
        width: 89,
        height: 36,
        borderRadius: 20,
        backgroundColor: "#2F333C"
    },
    clearText: {
        color: "white",
        fontSize: 13

    }
})



export default ScannedExhibits;