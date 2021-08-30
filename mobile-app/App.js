/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Text, Image, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import QRScreen from './Screens/QRScreen';
import HelpScreen from './Screens/HelpScreen';


const Stack = createNativeStackNavigator();


// Create a custom theme object
const theme = {
  ...DefaultTheme,

}

const App = () => {




  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome" }} />
          <Stack.Screen
            name="QR Scanner"
            component={QRScreen}
            options={{ title: "Scanner" }} />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{ title: "Help" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
