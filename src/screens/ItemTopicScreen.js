import React, { useState, useEffect } from "react"
import {StyleSheet} from "react-native"
import {Container, Content, Body, Left, Right, Button, Text, Icon, List, ListItem} from "native-base"
import { Ionicons} from '@expo/vector-icons';
import ItemWordInTopic from "../components/ItemWordInTopic";
import Axios from "axios";
import {HOST} from "../constants/host_port"

export default function ItemTopicScreen(props)
{
  const [listWord, setListWord] = useState([]);
  
  const {id} = props.route.params;
  
  useEffect(() =>{
    Axios.get(`http://${HOST}:3000/topics/${id}`)
    .then((res) => {
      setListWord(res.data.data.words)
    })
    .catch(err => console.log("err: ", err))
  },[])
  return(
    <Container>
      <Content>
        <List
          dataArray={listWord}
          renderItem={({e}) => (
            <ItemWordInTopic key={e.id} item={e}/>
          )}
          keyExtractor={e => e.id}
        />
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