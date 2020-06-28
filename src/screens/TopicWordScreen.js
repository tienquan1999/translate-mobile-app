import React, { useEffect, useState } from "react"
import {Left, Right, Text, List, ListItem } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import Axios from "axios"
import { HOST } from "../constants/host_port"

export default function TopicWordScreen(props) {
  const [data, setData] = useState([])
  useEffect(() => {
    Axios.get(`http://${HOST}:3000/topics`)
      .then((res) => {
        setData(res.data.data.topics)
      })
      .catch(err => {
        console.log("err: ", err)
      })
  }, [])
  return (
    <List
      dataArray={data}
      renderItem={({ item }) => {
        return (
          <ListItem onPress={() => props.navigation.navigate("ItemTopic", { title: item.content, id: item.id_topic })}>
            <Left>
              <Text style={{color:"#0077b3"}}>{item.content}</Text>
            </Left>
            <Right>
              <MaterialIcons name="keyboard-arrow-right" color="#bfbfbf" size={30} />
            </Right>
          </ListItem>
        )
      }}
      keyExtractor={item => item.id_topic.toString()}
    />
  )
}