import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import axios from 'axios';

const getToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@tokens')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
}

const storeToken = async (tokens) => {
    try {
        const jsonTokens = JSON.stringify(tokens)
        await AsyncStorage.setItem('@tokens', jsonTokens)
    } catch (e) {
        console.log(e);
    }
}

const getSpotify = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
}
const storeSpotify = async (tokens, key) => {
    try {
        const jsonTokens = JSON.stringify(tokens)
        await AsyncStorage.setItem(key, jsonTokens)
    } catch (e) {
        console.log(e);
    }
}

const refreshToken = async (navigation, isHome) => {
    return getToken().then(tokenValue => {
        if(tokenValue == null) {
            navigation.navigate("SignIn")
        }

        if (tokenValue.refreshToken == null) {
            navigation.navigate("LogIn")
        }
        else {
            try {
                axios({

                    method: 'post',
                    url: 'https://qrdocent.com/api/refreshMuseumUserToken',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${tokenValue.refreshToken}`
                    }

                }).then(res => {
                    if(res.data.success == false) {
                        navigation.replace("LogIn");
                        
                        
                      } 
                      else {
                        tokenValue.accessToken = res.data.result.accessToken;
                        storeToken(tokenValue);
                        if(isHome)
                            navigation.replace("Home");
                      }
                }).catch((err)=>navigation.replace("LogIn"))
            }
            catch (err) {
                navigation.replace("LogIn")
            }
        }
    }).catch((err) => navigation.replace("LogIn"))
}

 async function refreshSpotifyToken  (navigation, params) {
    return getSpotify('@spotify_token').then(tokenValue => {
        if(tokenValue == null) {
            
            return false;
        }
            
        if (tokenValue.refresh_token == null) {
            

            return false;
        }
        else {

            const data = JSON.stringify({
                refresh_token: tokenValue.refresh_token
            })

            

            try {
                return axios({

                    method: 'post',
                    url: 'https://qrdocent.com/api/spotifyRefreshToken?refresh_token='+tokenValue.refresh_token,
                    headers: {
                          
                    }

                }).then(res => {
                        if (res.data.success == false) {
                            return false
                        }
                        tokenValue.access_token = res.data.access_token;
                        storeSpotify(tokenValue, '@spotify_token');
                        navigation.replace("Generate",params);
                        return true;
                      
                }).catch((err)=> { return false})
            }
            catch (err) {
                

                return false
            }
        }
    }).catch((err) => false)
}


export { getToken, storeToken, refreshToken, getSpotify, storeSpotify, refreshSpotifyToken }