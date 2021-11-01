import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView, 
    KeyboardAvoidingView, Keyboard, useWindowDimensions, Dimensions} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Header from '../Components/Header';
import SignUpButton from '../Components/Buttons/SignUpButton';
import LoginButton from '../Components/Buttons/LoginButton';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';

const LogInScreen = ({ navigation }) => {
    const [text, setText] = useState('');
    const [showMessage, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const windowHeight = useWindowDimensions().height;
    const {height,width} = Dimensions.get("screen")







    function goHome() {
        //setPageNum(1);
        navigation.navigate('CodeEntry');
    }

    function goSignUp() {
        //setPageNum(1);
        navigation.navigate('SignIn');
    }

    function LogIn () {
        if (text.length !== 10) {
            setMessage("invalid number")
            return;
        }

        setLoading(true);

        let phoneNumber = "+1" + text;
        const numData = JSON.stringify({
            phoneNumber: phoneNumber
        })

        try {
            axios({

                method: 'post',
                url: 'https://qrdocent.com/api/loginMuseumUser',
                data: numData,
                headers: {
                    'Content-Type': 'application/json',
                },

            }).then(res => {
                if(res.data.success == false) {
                        setMessage(res.data.message)
                        setLoading(false)
                }
                else {
                    navigation.navigate('CodeEntry', {phoneNumber: phoneNumber});
                   
                }
               
                console.log(res.data);
                
                
            }).catch(err => console.log(err))
        } catch (err) {

        }

    }

    if (loading == true) {
        return (
            <LoadingScreen/>
        )
    }

    return (
       

            <View style={{ backgroundColor: '#282B33', minHeight: Math.round(height)  }}>
                
                    <Header goHome={goHome} showSettings={false}  />

                    {/* <View style={styles.container}> */}
                    <ScrollView contentContainerStyle={styles.container} bounces="false" onPress={Keyboard.dismiss} keyboardShouldPersistTaps="handled">
                        <Text style={styles.title}>LOG IN</Text>
                        <Text style={{ fontSize: 20, color: "white", textAlign: "center", marginBottom: 15 }}>Enter Your phone number {"\n"}to log in</Text>
                        <Text style={{ fontSize: 14, color: "white", marginBottom: 15 }}>You'll recieve a 6-digit verification code</Text>
                        <TextInput
                            onPressOut
                            value={text}
                            mode="outlined"
                            onChangeText={text => setText(text)}
                            style={styles.input}
                            outlineColor="transparent"
                            underlineColor="white"
                            keyboardType="number-pad"
                            theme={{ colors: { primary: 'white', underlineColor: 'white', text: 'white', placeholder: "white" }, roundness: 20 }}
                            left={<TextInput.Affix text="+1" textStyle={{marginTop:8}} theme={{ colors: { text: 'white' }, }} style={{marginBottom:10}} />}
                        />
                        <TouchableOpacity onPress={LogIn}>
                        <LoginButton />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goSignUp}>
                        <Text style={{ fontSize: 17, color: "#614AD3", marginTop: 15 }}>I DON'T HAVE AN ACCOUNT</Text>
                        </TouchableOpacity>
                        <Text style={styles.message}>{showMessage}</Text>


                    </ScrollView>
                    {/* </View>
                 */}
            </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.7,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        
    },
    title: {
        fontSize: 37,
        color: "white",
        marginBottom: 10
    },
    input: {
        width: 313,
        height: 47,
        backgroundColor: "#2F333C",
        color: "transparent",
        fontSize: 25,
        marginBottom: 15
    },
    message: {
        color:"#FF5D5D",
        position:"relative",
        top: 20,
        fontSize:16,
        textTransform:"uppercase"
      }
})

export default LogInScreen;