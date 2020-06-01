import React from "react";
import { View,  Button ,TouchableOpacity,StyleSheet, Image} from "react-native";
 
import { Card, CardItem,  Text,Body } from "native-base";

export default function FloatButton(){
    return(
        <View style={styles.MainContainer}>
         
         <TouchableOpacity 
         style={styles.TouchableOpacityStyleLove}>
          <Image style={styles.FloatingButtonStyle} source={require('../icon/heartincircle.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacityStyleSearch}>
          <Image style={styles.FloatingButtonStyle} source={require('../icon/searchincircle.png')}/>
        </TouchableOpacity>
      </View>
    )
}
const styles = StyleSheet.create({
    MainContainer: {
      
      backgroundColor: '#ffffff',
    },
  
    TouchableOpacityStyleLove: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 50,
      bottom: 30,
    },
    TouchableOpacityStyleSearch:{
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 10,
      bottom: 30,
    },
  
    FloatingButtonStyle: {
      width: 35,
      height:35
    },
  })

