import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import Header from '../Components/Header';
import { OneIcon, TwoIcon, ThreeIcon, FourIcon } from '../Components/SvgComponents/NumberIcons'
import CameraButton from '../Components/CameraButton';
import Generate from '../Components/Generate';
const HelpScreen = ({navigation}) => {
    const [pageNum, setPageNum] = useState(1);

    function changePage() {
        setPageNum(pageNum + 1);
    }

    function goHome() {
        //setPageNum(1);
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <Header goHome={goHome} showSettings={true}/>
            <View style={styles.headingContainer}>
                <Text style={styles.title}>HOW TO USE {'\n'} THE APP</Text>
            </View>
            {pageNum == 1 && <HelpOne />}
            {pageNum == 2 && <HelpTwo />}
            {pageNum == 3 && <HelpThree />}
            {pageNum == 4 && <HelpFour />}

            <View style={styles.nextArea}>
                {pageNum !== 4 && <Button icon="chevron-right" labelStyle={styles.next} style={{ borderRadius:24 }} contentStyle={{ flexDirection: "row-reverse" }} onPress={changePage}>NEXT</Button>}
                {pageNum == 4 && <Button  labelStyle={styles.next} style={{ borderRadius:24 }} onPress={goHome}>DONE</Button>}
            </View>
        </View>
    )
}

const HelpOne = () => {
    return (
        <View style={styles.infoArea}>
            <View style={styles.number}>
                <OneIcon />
            </View>
            <View style={styles.instructions}>
                <Text style={{ ...styles.text, marginBottom: 20 }}>Locate a code next to an{"\n"} exhibit</Text>
                <Text style={{ ...styles.text, marginBottom: 40 }}>It will look something like{"\n"} this:</Text>
                <Image source={require('../images/image4.png')} />
            </View>
        </View>
    )
}

const HelpTwo = () => {
    return (
        <View style={styles.infoArea}>
            <View style={styles.number}>
                <TwoIcon />
            </View>
            <View style={styles.instructions}>
                <Text style={{ ...styles.text, marginBottom: 30 }}>Press the camera button at{"\n"} the bottom of the screen:</Text>
                <CameraButton disable={true} size={75} borderRadius={38} />
                <Text style={{ ...styles.text, marginTop: 30 }}>This will open the camera{"\n"} view and will let you scan the{'\n'} code.</Text>
            </View>
        </View>
    )
}

const HelpThree = () => {
    return (
        <View style={styles.infoArea}>
            <View style={styles.number}>
                <ThreeIcon />
            </View>
            <View style={styles.instructions}>
                <Text style={{ ...styles.text, marginBottom: 10 }}>
                    Position the camera so that it{"\n"}
                    is looking at the QR code.{"\n"}
                    The entire code must be{"\n"}
                    inside the boundaries for{"\n"}
                    scanning to work.
                </Text>
                <Image source={require('../images/image3.png')} />
                <Text style={{ ...styles.text, marginTop: 10 }}>
                    The app will detect the code{"\n"}
                    and add the exhibit to your{"\n"}
                    personalized list.
                </Text>
            </View>
        </View>
    )
}

const HelpFour = () => {
    return (
        <View style={styles.infoArea}>
            <View style={styles.number}>
                <FourIcon />
            </View>
            <View style={styles.instructions}>
                <Text style={{ ...styles.text, marginBottom: 30 }}>
                    Finally, press the “Generate{"\n"}
                    playlist” button to get a{"\n"}
                    custom-generated music{"\n"}
                    playlist based on the artists{"\n"}
                    you scanned:
                </Text>
                <Generate disable={true} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#282B33',
        flex: 1
    },
    headingContainer: {
        flex: 0.18,
        justifyContent: "flex-end",
    },
    title: {
        color: 'white',
        fontFamily: 'System',
        fontSize: 37,
        textAlign: "center"
    },
    infoArea: {
        flex: 0.547,
        alignItems: "center"
    },
    nextArea: {
        alignItems: "center",
        flex: 0.158,
        justifyContent: "center"
    },
    next: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        borderRadius:24
    },
    number: {
        flex: 0.20,
        justifyContent: "center"
    },
    instructions: {
        flex: 0.8,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    text: {
        color: 'white',
        fontFamily: 'System',
        fontSize: 20,
        textAlign: "center"
    }
})

export default HelpScreen;