import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, useWindowDimensions, Alert, ScrollView, SafeAreaView } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, IconButton } from 'react-native-paper';
import Generate from './Generate';
import ExhibitButton from './ExhibitButton';
import axios from 'axios'

const ScannedExhibits = (props) => {

    return (
        <View style={{flex:0.775, }}>
            <View style={styles.header}>
                <Text style={styles.title}>YOUR SCANS</Text>
                
                <Button style={styles.clearButton} icon="close" contentStyle={{height:"100%", width:"100%"}} labelStyle={styles.clearText}>clear</Button>
            </View>
            <SafeAreaView style={styles.scans}>
            <ScrollView style={{width:"100%", marginLeft:12}}>
            <ExhibitButton image={props.image} data={props.data} navigation={props.navigation}/>
            <ExhibitButton image={props.image} data={props.data} navigation={props.navigation}/>
            <ExhibitButton image={props.image} data={props.data} navigation={props.navigation}/>
            <ExhibitButton image={props.image} data={props.data} navigation={props.navigation}/>
            <ExhibitButton image={props.image} data={props.data} navigation={props.navigation}/>
            <ExhibitButton image={props.image} data={props.data} navigation={props.navigation}/>
            <ExhibitButton image={props.image} data={props.data} navigation={props.navigation}/>
            
           

            <View
                style={{
                    
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    

                }}>
                    
                    <Generate/>
            </View>

            </ScrollView>
            </SafeAreaView>

            

        </View>
    )

}

const styles = StyleSheet.create({
    header: {
        flex: 0.12, 
         
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-start",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop:15,
        borderRadius:25,
        

    },
    scans: {
        flex:0.88,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:"100%"
        
        

    },
    title: {
        color:"white",
        fontSize:28,
        fontWeight:"bold",
        fontStyle:"normal"

    },
    clearButton: {
        width:89,
        height:36,
        borderRadius:20,
        backgroundColor:"#2F333C"
    },
    clearText: {
        color: "white",
        fontSize:13

    }
})



export default ScannedExhibits;