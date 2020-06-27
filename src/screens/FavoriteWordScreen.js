import React , {useEffect, useState} from "react"
import { List,Container, Content } from "native-base"
import { addWordToFavoriteList, deleteWordFromFavoriteList,getFavoriteWord} from "../utils/controller"
import { ItemFavoriteWord } from "../components/ItemFavoriteWord";

export function FavoriteWordScreen(props) {
  let [listWord, updateListWord] = useState([]);
  useEffect(()=>{
    async function fetchData(){
      const listItem = await getFavoriteWord();
      updateListWord(listItem);
    }
    fetchData()
  }, [])
  return (
    <Container>
      <Content>
        <List>
          {
            listWord.map((e, index) => {
              return (
                <ItemFavoriteWord key={index} item={e}/>
              )
            })
          }
        </List>
      </Content>
    </Container>
  )
}