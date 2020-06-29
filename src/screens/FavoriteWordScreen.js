import React, { useEffect, useState } from "react"
import { List, Container, Content, Text, Body } from "native-base"
import { getFavoriteWord, deleteWordFromFavoriteList } from "../utils/controller"
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

  async function deleteItem(word){
    await deleteWordFromFavoriteList(word);
    let newArray = [...listWord];
    let index = newArray.findIndex(e => 
      e.word === word
    )
    newArray.splice(index, 1);
    updateListWord(newArray)
  }

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
            <ItemFavoriteWord item={item} onDelete={deleteItem}/>
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