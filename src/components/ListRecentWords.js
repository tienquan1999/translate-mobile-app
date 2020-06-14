import React, { useState } from "react";
import { View, StyleSheet, FlatList, Button, Text} from "react-native";

import IconEarth from 'react-native-vector-icons/MaterialCommunityIcons'
import IconTime from 'react-native-vector-icons/Entypo'

import CardWord from "./CardWord";
const { textToSpeechWithApiGoogle } = require("../utils/google-api/text-to-speech");

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
      <Button title="Click me" onPress={async () => {
        // let result = await translateText({
        //   from: "vi",
        //   to: "en",
        //   word: "Minh ten la Quan"
        // });
        // console.log(result);
        await textToSpeechWithApiGoogle("Javascript array search example.", "en");
      }} />
      <View style={styles.viewBtn}>
        <IconEarth.Button name="earth" color="#0088cc" backgroundColor="#ffffff" size={30}
          onPress={() => props.navigation.navigate('SearchOnline')}>
          <Text style={styles.btnText}>Dịch Online</Text>
        </IconEarth.Button>
      </View>
      <View style={styles.viewBtn}>  
        <IconTime.Button style={styles.btn} name="back-in-time" color="red" backgroundColor="#ffffff" size={30}>
          <Text style={styles.btnText}>Từ đã tra </Text>
        </IconTime.Button>
      </View>
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
