import React, { useEffect, useState } from "react"
import { List, Container, Content, Text, Body } from "native-base"
import { getFavoriteWord } from "../utils/controller"
import { ItemFavoriteWord } from "../components/ItemFavoriteWord";
import { StyleSheet, View } from "react-native";

export function FavoriteWordScreen(props) {
  let [listWord, updateListWord] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const listItem = await getFavoriteWord();
      updateListWord(listItem);
    }
    fetchData()
  }, [])
  return (
    (listWord.length === 0) ? (
      <View style={styles.content}>
        <Text style={styles.text}>Chưa có từ nào trong danh sách từ vựng của bạn </Text>
      </View>
    ) : (
        <List 
          dataArray={listWord}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ItemFavoriteWord item={item} />
          )}
        />
      )
  )
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flexWrap: "wrap",
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  }
})