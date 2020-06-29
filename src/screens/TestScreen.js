import React, { useState, useEffect } from "react"
import {View, Text} from "react-native"
import {List, ListItem, Body, Right} from "native-base"
import {HOST} from "../constants/host_port"
import Axios from "axios"
import { MaterialIcons } from "@expo/vector-icons"

export default function TestScreen(props)
{
  const [data, setData] = useState([])

  useEffect(()=>{
    Axios.get(`http://${HOST}:3000/tests`)
    .then(res =>{
      setData(res.data.data.tests)
    })
    .catch(err => console.log("err: ", err))
  }, [])
  return(
    <List
      dataArray={data}
      renderItem={({item}) => (
        <ListItem onPress={() => props.navigation.navigate("DetailTest", { title: item.content,id_test: item.id_test})}>
          <Body>
            <Text style={{color:"#0077b3"}}>{item.content}</Text>
          </Body>
          <Right>
            <MaterialIcons name="keyboard-arrow-right" color="#bfbfbf" size={30} />
          </Right>
        </ListItem>
      )}
      keyExtractor={item => item.id_test.toString()}
    />
  )
}