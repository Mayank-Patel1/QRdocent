


import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView, SafeAreaView, 
    KeyboardAvoidingView, Keyboard, useWindowDimensions, Dimensions} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Header from '../Components/Header';

import VerifyButton from '../Components/Buttons/VerifyButton';
import axios from 'axios';


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
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const {height,width} = Dimensions.get("screen")
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  function goHome() {
    //setPageNum(1);
    navigation.navigate('Home');
}

  return (
    <View style={{ backgroundColor: '#282B33', minHeight: Math.round(height)  }}>
                
    <Header goHome={goHome} showSettings={false}  />

    {/* <View style={styles.container}> */}
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
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
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
        <TouchableOpacity onPress={()=>console.log(value)}>
        <VerifyButton />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, color: "#614AD3", marginTop: 15 }}>RESEND CODE</Text>


    </ScrollView>
    {/* </View>
 */}
</View>





    
  );
};

export default CodeEntryScreen;