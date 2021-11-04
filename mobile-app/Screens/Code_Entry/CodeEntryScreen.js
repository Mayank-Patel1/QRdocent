


import React, { useState } from 'react';
import {
  Text, View, TouchableOpacity, ScrollView, SafeAreaView, Keyboard, Dimensions, StyleSheet
} from 'react-native';
import Header from '../../Components/Header';
import VerifyButton from './Components/VerifyButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles from './styles';

const CELL_COUNT = 6;

const CodeEntryScreen = ({ route, navigation }) => {

  const [value, setValue] = useState('');
  const [showMessage, setMessage] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const { height, width } = Dimensions.get("screen")
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const storeToken = async (tokens) => {
    try {
      const jsonTokens = JSON.stringify(tokens)
      await AsyncStorage.setItem('@tokens', jsonTokens)
    } catch (e) {
      console.log(e);
    }
  }

  const getToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@tokens')
        console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
        console.log(e);
    }
}

  function goHome() {
    navigation.replace('Home');
  }

  function LogIn() {

    const numData = JSON.stringify({
      phoneNumber: route.params.phoneNumber,
      confirmationCode: value
    })

    try {
      axios({

        method: 'post',
        url: 'https://qrdocent.com/api/verifyMuseumUserConfirmationCode',
        data: numData,
        headers: {
          'Content-Type': 'application/json',
        },

      }).then(res => {
        if(res.data.success == false) {
          setMessage(res.data.message);
        } 
        else {
          console.log(res.data.result)
          storeToken(res.data.result);
          navigation.replace('Home')
          
        }

      }).catch(err => console.log(err + " ERROR"))
    } catch (err) {
      setMessage("cannot connect - check connection")
    }

  }



  return (
    <View style={{ backgroundColor: '#282B33', minHeight: Math.round(height) }}>

      <Header goHome={goHome} showSettings={false} />

      
      <ScrollView contentContainerStyle={styles.container} bounces="false" onPress={Keyboard.dismiss}>
        <Text style={styles.title}>ENTER CODE</Text>
        <Text style={{ fontSize: 20, color: "white", textAlign: "center", marginBottom: 15 }}>Enter the 6-digit verification code{"\n"} you received</Text>

        <SafeAreaView style={styles.root}>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
        <Text style={styles.message}>{showMessage}</Text>
        <TouchableOpacity onPress={LogIn}>
          <VerifyButton />
        </TouchableOpacity>
        <TouchableOpacity onPress={getToken}>
        <Text style={{ fontSize: 17, color: "#614AD3", marginTop: 15 }}>RESEND CODE</Text>
        </TouchableOpacity>

      </ScrollView>
      
    </View>






  );
};



export default CodeEntryScreen;