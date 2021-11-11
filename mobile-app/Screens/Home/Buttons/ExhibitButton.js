import React, { useState, useContext, useRef, useEffect } from 'react';
import { Text, Image, View, TouchableOpacity, TouchableHighlight, StyleSheet, useWindowDimensions, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS } from 'react-native-reanimated';
import TrashIcon from '../Icons/TrashIcon';
import { SongContext } from '../../../Components/SongContext';



const ExhibitButton = (props) => {
    const slideButton = useSharedValue(0)
    const displayEx = useSharedValue('flex')
    const offScreen = useSharedValue(0)
    const visible = useSharedValue(1)
    const [disable, setDisable] = useState("none");
    const [outside, setOutside] = useState(props.outside)
    const {songs, setSongs} = useContext(SongContext)



    const [deleteShown, setDelete] = useState(1000);


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            borderRadius: 20,
            width: "97%",
            backgroundColor: "#2F333C",
            height: 74,
            marginBottom: 15,

        },
        under: {
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            borderRadius: 20,
            width: "97%",
            backgroundColor: "#25282e",
            height: 74,
            marginBottom: 15,
            position: "absolute"
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
        trash: {
            height: 74,
            width: 74,
            position: "absolute",
            right: "2%",
        },


    })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: slideButton.value
            }
        ],

    }))

    const animatedStyle2 = useAnimatedStyle(() => ({
        display: displayEx.value,
        opacity: visible.value,
        transform: [
            {
                translateX: offScreen.value
            }
        ],



    }))

    useEffect(() => {

        outsideTap()

    }, [outside])


    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    function goExhibit() {
        props.navigation.navigate('Exhibit', { data: props.data })
        console.log(props.data);
    }






    function slide() {
        if (slideButton.value == 0) {
            slideButton.value = withTiming(-74)
            setDisable("flex")
        }
        else {
            slideButton.value = withTiming(0)
            setDisable("none")
        }
    }

    function outsideTap() {
        slideButton.value = withTiming(0)
    }

    function remove() {

        let songsArray =  props.data.contents.map((content, index) => {
                if (content.contentTypeID == 3) {
                    return content.URL
                }
            })
        
        songsArray = [].concat.apply([], songsArray);

        songsArray = songsArray.filter(song => song !== undefined)

        songsArray = songsArray.map(song => {
            let songID = song.split("track/")[1].split("?")[0];
            return "spotify:track:" + songID
        })
        console.log(songsArray)
         setSongs(songs.filter(song=>!songsArray.includes(song)))

        visible.value = withTiming(0);
        offScreen.value = withTiming(-250);


        setTimeout(() => {
            displayEx.value = 'none'
        }, 700)

    }

    return (
        <View >

            <AnimatedTouchable onPress={goExhibit} onLongPress={slide} style={[animatedStyle2]}>
                <Button style={[styles.under]} />
                <View style={[styles.trash,]}>
                    <IconButton icon={TrashIcon} onPress={() => { remove(); return props.deleteExhibit(props.data.scanID) }} size={40} style={{ borderRadius: 20, padding: 17 }} mode="contained" color="rgba(255,255,255,0)">
                        {/* <TrashIcon style={{margin:17.5}}/> */}
                    </IconButton>
                </View>

                {/* <PanGestureHandler onGestureEvent={panGesture}  > */}


                <Animated.View style={[styles.container, animatedStyle]}>
                    {/* {uri:  props.data.mainImage   } */}
                    <Image source={{ uri: props.data.mainImage }} style={{ resizeMode: 'cover', width: 56, height: 57, borderRadius: 20, marginLeft: 10 }} />
                    <Text style={styles.text}>  {props.data.name} </Text>
                    <IconButton icon="chevron-right" color="white" raised labelStyle={{ fontSize: 25 }} style={styles.settingsButton} />
                </Animated.View>


                {/* </PanGestureHandler> */}

            </AnimatedTouchable>



        </View>
    )
}

export default ExhibitButton;