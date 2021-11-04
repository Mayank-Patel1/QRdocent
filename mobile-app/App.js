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
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './Screens/Home/HomeScreen';
import QRScreen from './Screens/QR_Scanner/QRScreen';
import HelpScreen from './Screens/Help/HelpScreen';
import ExhibitScreen from './Screens/Exhibit/ExhibitScreen';
import SignInScreen from './Screens/SignUp/SignInScreen';
import CodeEntryScreen from './Screens/Code_Entry/CodeEntryScreen';
import LogInScreen from './Screens/LogIn/LogInScreen';
import SplashScreen from './Screens/Splash/SplashScreen'
import GenerateScreen from './Screens/Generate_Playlist/GenerateScreen';
import SettingsScreen from './Screens/Settings/SettingsScreen';



const Stack = createNativeStackNavigator();


// Create a custom theme object
const theme = {
  ...DefaultTheme,

}

const App = () => {

  return (
    <>
            <StatusBar style="light" />
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ title: "Welcome" }, {gestureEnabled: false}} />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: "Sign In" }, {gestureEnabled: false}} />
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{ title: "Log In" }, {gestureEnabled: false}} />
          <Stack.Screen
            name="CodeEntry"
            component={CodeEntryScreen}
            options={{ title: "Enter Code" }, {gestureEnabled: false}} />
          <Stack.Screen
            name="QR Scanner"
            component={QRScreen}
            options={{ title: "Scanner" }, {gestureEnabled: false}} />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{ title: "Help" },{gestureEnabled: false}} />
          <Stack.Screen
            name="Exhibit"
            component={ExhibitScreen}
            options={{ title: "Exhibit" },{gestureEnabled: false}} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome" },{gestureEnabled: false}} />
            <Stack.Screen
            name="Generate"
            component={GenerateScreen}
            options={{ title: "Make Playlist" },{gestureEnabled: false}} />
            <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Settings" },{gestureEnabled: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </>
  );
};

export default App;
