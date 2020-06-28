import React, { useState, useEffect } from "react"
import {StyleSheet} from "react-native"
import {Container, Content, Body, Left, Right, Button, Text, Icon, List, ListItem} from "native-base"
import { Ionicons} from '@expo/vector-icons';
import ItemWordInTopic from "../components/ItemWordInTopic";
import Axios from "axios";


export default function ItemTopicScreen(props)
{
  const [listWord, setListWord] = useState([]);
  
  const {id} = props.route.params;
  
  useEffect(() =>{
    Axios.get(`http://172.20.10.7:3000/topics/${id}`)
    .then((res) => {
      console.log("id: ", id)
      setListWord(res.data.data.words)
      console.log("list word: ",res.data)
    })
    .catch(err => console.log("err: ", err))
  },[])
  return(
    <Container>
      <Content>
        <List>
        {
          (listWord || []).map((e, index) => {
            return (
              <ItemWordInTopic key={e.id} item={e}/>
            )
          })
        }
        </List>
      </Content>
    </Container>
  )
}
const styles = StyleSheet.create({
  boxWord: {
    color: "#004466",
    fontWeight: "bold",
    fontSize: 18
  },
  boxMedia: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})