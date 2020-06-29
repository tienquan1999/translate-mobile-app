import React ,  {useEffect, useState} from "react"
import {Left, Right, Text, List, ListItem, Body} from "native-base"
import {View, StyleSheet} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import Axios from "axios"
import {HOST} from "../constants/host_port"

export default function GrammarScreen(props)
{
  const [data, setData] = useState([])

  useEffect(() => {
    Axios.get(`http://${HOST}:3000/list-grammar`)
      .then((res) => {
        setData(res.data.data.listGrammar)
      })
      .catch(err => {
        console.log("err: ", err)
      })
  }, [])

  const handleNavigation = (item) =>{
    const {has_child, SentenceChildren, name, id_sentence} = item;
    if(has_child)
      props.navigation.navigate("ChildFirst",{title: name, SentenceChildren: SentenceChildren, id_sentence: id_sentence})
    else
      props.navigation.navigate("ChildSecond", {title: name, id_sentence: id_sentence})
  }
  return (
    <List
      dataArray={data}
      renderItem={({ item }) => {
        return (
          <ListItem onPress={() => handleNavigation(item)}>
            <Body >
              <Text style={styles.name}>{item.name}</Text>
              <Text note numberOfLines={1}>{item.bonus}</Text>
            </Body>
            <Right>
              <MaterialIcons name="keyboard-arrow-right" color="#bfbfbf" size={30} />
            </Right>
          </ListItem>
        )
      }}
      keyExtractor={item => item.id_sentence.toString()}
    />
  )
}
const styles = StyleSheet.create({
  name:{
    color:"#0077b3",
  },
})