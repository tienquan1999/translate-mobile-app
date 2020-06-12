import React, { useState } from "react";
import { View, StyleSheet, FlatList, Button,Text } from "react-native";
import CardWord from "./CardWord";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' 
import { TouchableOpacity } from "react-native-gesture-handler";
const {translateText} = require("../utils/controller");
const {textToSpeechWithApiGoogle} = require("../utils/google-api/text-to-speech");
const {startRecording} = require("../utils/google-api/speech-to-text");

export default function ListRecentWords(props) {
  const [recentWords, setRecentWords] = useState([
    { word: "cat", proper: "danh tu", mean: "mèo", key: "2" },
    { word: "dog", proper: "danh tu", mean: "chó", key: "3" },
    ]
  );
  return (
    <View style={styles.list}>
      <FlatList
        data={recentWords}
        renderItem={({ item }) => (
          <CardWord item={item} nav={props.navigation}/>
        )}
      />
      <View style={styles.viewAround}>
        <Icon.Button name="earth" style={styles.viewBtnOnline} onPress={() =>  props.navigation.navigate('SearchOnline')}>
          
          <Text style= {styles.text}>Dịch Online</Text>
        </Icon.Button>
      
      </View>
      <Button title="text to speech" onPress={async () => {
        // let result = await translateText({
        //   from: "vi",
        //   to: "en",
        //   word: "Minh ten la Quan"
        // });
        // console.log(result);
        await textToSpeechWithApiGoogle("Javascript array search example.", "en");
      }}/>
      <Button title="speech to text" onPress={async () => {
        // let result = await translateText({
        //   from: "vi",
        //   to: "en",
        //   word: "Minh ten la Quan"
        // });
        // console.log(result);
        await startRecording();
      }}/>  
    </View>

  )
}
const styles = StyleSheet.create({
  list: {
    marginBottom:100,
     
  },
  viewAround :{
    flexDirection : "column",
    alignItems : "center"
  },
  viewBtnOnline : {
    flexDirection : "row",
    backgroundColor :"#0088cc",
    height : 45,
    width : 250,
    alignContent :"center",
    textAlign :"center",
    borderRadius : 10
  },
  text :{
    color: "#ffffff",
    fontSize : 15,
    justifyContent : "center"
  }
})
