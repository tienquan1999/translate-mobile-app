import React , {useEffect} from "react"
import { List,Container, Content } from "native-base"
import { addWordToFavoriteList, deleteWordFromFavoriteList,getFavoriteWord} from "../utils/controller"
import { ItemFavoriteWord } from "../components/ItemFavoriteWord";

const tmp_list = [
  {
    word: "hello",
    liked: true
  },
  {
    word: "cat",
    like: false
  },
  {
    word: "dog",
    liked: false
  },
  {
    word: "book",
    liked: true
  },
]
export function FavoriteWordScreen(props) {
  useEffect(()=>{
    const fetchData=async()=>{
      const listItem = await getFavoriteWord();
      console.log("list item: ", listItem)
    }
    fetchData()
  },[])
  return (
    <Container>
      <Content>
        <List>
          {
            tmp_list.map((e, index) => {
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