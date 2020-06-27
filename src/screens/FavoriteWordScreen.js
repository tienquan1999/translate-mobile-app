import React, { useEffect, useState } from "react"
import { List, Container, Content , Text, Body} from "native-base"
import { addWordToFavoriteList, deleteWordFromFavoriteList, getFavoriteWord } from "../utils/controller"
import { ItemFavoriteWord } from "../components/ItemFavoriteWord";
import { StyleSheet } from "react-native";

export function FavoriteWordScreen(props) {
  let [listWord, updateListWord] = useState([]);
  console.log(listWord)
  // useEffect(() => {
  //   async function fetchData() {
  //     const listItem = await getFavoriteWord();
  //     updateListWord(listItem);
  //     console.log("list item: ", listItem)
  //   }
  //   fetchData()
  // }, [])
  return (
    <Container>
      {
        (listWord === []) ? (
          <Content style={styles.content}>
            <Body>
            <Text style={styles.text}>Chưa có từ nào trong danh sách từ vựng của bạn </Text>

            </Body>
          </Content>
        ) : (
            <Content>
              <List>
                {
                  listWord.map((e, index) => {
                    return (
                      <ItemFavoriteWord key={index} item={e} />
                    )
                  })
                }
              </List>
            </Content>
          )
      }
    </Container>
  )
}
const styles = StyleSheet.create({
  content:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    textAlign:"center",
    color:"gray"
  }
})