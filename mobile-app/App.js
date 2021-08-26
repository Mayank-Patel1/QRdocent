/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';

 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   Image,
   View,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 const App = () => {
   return (
     <View
       style={{backgroundColor: '#282B33', flex: 1, justifyContent: 'center'}}>
       <View
         style={{
           flex: 0.3,
           justifyContent: 'space-between',
           alignItems: 'center',
         }}>
         <Text style={{color: 'white', fontFamily: 'System', fontSize: 37}}>
           QR DOCENT
         </Text>
         <Image source={require('./images/image4.png')}></Image>
       </View>
     </View>
   );
 };
 
 export default App;
 