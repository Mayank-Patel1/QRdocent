import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import SpotifyIcon from "./SvgComponents/SpotifyIcon";
import YouTubeIcon from "./SvgComponents/YouTubeIcon";
import LinkIcon from "./SvgComponents/LinkIcon";
import CloseIcon from "./SvgComponents/CloseIcon";

const MusicModal = (props) => {
  const [modalVisible, setModalVisible] = useState(props.show);






  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!props.show);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>

            <View
              style={[styles.button, styles.closeBox]}
              onPress={props.hide}
            >
                <TouchableOpacity onPress={props.hide}>
               
                <CloseIcon/>
                </TouchableOpacity>
              
            </View>
            <View style={styles.desc}>
                <LinkIcon/>
                <Text style={styles.titleStyle}>LINK YOUR ACCOUNT</Text>
            </View>
            
            </View>
            <TouchableOpacity
              style={[styles.button, styles.spotify]}
              onPress={props.hide}
            >
                <SpotifyIcon/>
              <Text style={styles.textStyle}>  SIGN IN WITH SPOTIFY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.youtube]}
              onPress={props.hide}
            >
                <YouTubeIcon/>
              <Text style={styles.textStyle}>  SIGN IN WITH YOUTUBE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container:  {
    display:"flex",
    flexDirection:"row",
    height:200,
    width:"100%",
    
    borderRadius:20
  },
  desc: {
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width:"70%",
     
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2F333C",
    borderRadius: 20,
    padding: 0,
    width:334,
    height:339,
    alignItems: "center",
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  spotify: {
    backgroundColor: "#1DB954",
    width:282,
    height:47,
    marginBottom:25
  },
  youtube: {
    backgroundColor: "#FF0000",
    width:282,
    height:47
  },
  closeBox: {
    
    width:50,
    height:"100%",
    display:"flex",
    alignItems:"flex-start",
    justifyContent:"center"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    
    fontSize:18
  },
  titleStyle: {
    color: "white",
    textAlign:"center",
    
    
    fontSize:37
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default MusicModal;