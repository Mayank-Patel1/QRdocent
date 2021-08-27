import React from 'react';
import { Text, Image, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';

const HomeScreen = ({navigation}) => {

    function goHome() {
        console.log("pressed!");
        navigation.navigate('QR Scanner')

      }
    
    return (
        <View
       style={{backgroundColor: '#282B33', flex: 1, justifyContent: 'center'}}>
       <View
         style={{
           flex: 0.5,
           justifyContent: 'space-between',
           alignItems: 'center',
         
         }}>
         <Text style={{color: 'white', fontFamily: 'System', fontSize: 37}}>
           QR DOCENT
         </Text>
         <Image source={require('../images/image4.png')}></Image>
         <Button icon="camera" mode="contained" onPress={goHome}>Demo</Button>
       </View>
     </View>
    )
}

export default HomeScreen;