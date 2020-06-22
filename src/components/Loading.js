import React from "react";
import {View , Text,StyleSheet} from "react-native";
 export default  function Loading(){
     return(
         <View style={styles.loadingBack}>
             <Text style={styles.text}>Loading</Text>
         </View>
     )
 }  
 const styles =StyleSheet.create({
     loadingBack : {
        backgroundColor : "red",
        height : '100%'
     }

    })