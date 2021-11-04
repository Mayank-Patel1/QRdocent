import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { View, Dimensions } from 'react-native'


function Help() {
    const helpImages = [
        require('../images/help1.jpg'),
        require('../images/help2.jpg'),
        require('../images/help3.jpg'),
        require('../images/help4.jpg'),
    ]


    return (
         <View style={{
             width: Dimensions.get("window").width * 0.67,  //260 
             height:Dimensions.get("window").width * 0.67 * 1.77,//460,
             maxHeight: 560,
             maxWidth: 360, 
             alignItems:"center", 
             overflow:"hidden", 
             borderColor:"#2F333C", 
             borderWidth:4, 
             borderRadius:20,
             marginBottom:50 }}>
            <SliderBox 
                images={helpImages} sliderBoxHeight={400}    
                ImageComponentStyle={{borderRadius: 15, width:"60%", maxWidth:360 * 0.6}}
                resizeMode={'cover'}
                resizeMethod={'resize'}


            />
         </View>
    )
}

export default Help;