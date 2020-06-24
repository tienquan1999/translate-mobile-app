import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text} from "react-native";

import {MaterialCommunityIcons} from "@expo/vector-icons"

import CardWord from "./CardWord";
import {getHistoryTranslate} from "../utils/controller"

export default function ListRecentWords(props) {
  const [recentWords, setRecentWords] = useState([
  ]
  );
  useEffect(() => {
    async function getRecentWords(){
      let words = await getHistoryTranslate();
      setRecentWords(words);
    }
    getRecentWords();
  }, [])

  return (
    <View style={styles.body}>
      <Text style={styles.titleList}>Từ tìm kiếm gần đây</Text>
      <FlatList
        style={styles.flatList}
        data={recentWords}
        renderItem={({ item }) => (
          <CardWord item={item} nav={props.navigation} key/>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  body: {
    margin: 5,
    height :'90%'
  },
  titleList: {
    color: "#004466",
    fontSize: 17,
    fontWeight: "bold",
    alignContent :"center",
    textAlign : "center"
  },
  
   
  flatList :{
    paddingRight : 0,
    paddingLeft : 15
  }
})
