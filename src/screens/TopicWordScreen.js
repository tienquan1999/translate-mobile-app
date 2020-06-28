import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { Container, Content, Body, Left, Right, Button, Text, Icon, List, ListItem } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import Axios from "axios"
import {HOST} from "../constants/host_port"

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
    <Container>
      <Content>
        <List
          dataArray={data}
          renderItem={({ e }) => (
            <ListItem key={e.id_topic} onPress={() => props.navigation.navigate("ItemTopic", { title: e.content, id: e.id_topic })}>
              <Left>
                <Text>{e.content}</Text>
              </Left>
              <Right>
                <MaterialIcons name="keyboard-arrow-right" color="#bfbfbf" size={30} />
              </Right>
            </ListItem>
          )}
          keyExtractor={e => e.id_topic}
        />
      </Content>
    </Container>
  )
}