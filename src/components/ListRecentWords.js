import React, { useState } from "react";
import { View, StyleSheet, FlatList, Button, Text} from "react-native";

import IconEarth from 'react-native-vector-icons/MaterialCommunityIcons'
import IconTime from 'react-native-vector-icons/Entypo'

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
    { word: "dog", proper: "danh tu", mean: "chó", key: "4" },
  ]
  );
  return (
    <View style={styles.body}>
      <Text style={styles.titleList}>Từ tìm kiếm gần đây</Text>
      <FlatList
        horizontal={true}
        data={recentWords}
        renderItem={({ item }) => (
          <CardWord item={item} nav={props.navigation} />
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
  body: {
    margin: 5
  },
  titleList: {
    color: "#004466",
    fontSize: 17,
    fontWeight: "bold"
  },
  viewBtn:{
    marginVertical:5
  },
  btn:{
    backgroundColor:"#ffffff",
    textAlign:"left"
  },
  btnText: {
    fontSize: 16,
    color:"#000000"
  },
})
