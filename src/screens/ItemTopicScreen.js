import React, { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import { List } from "native-base"
import ItemWordInTopic from "../components/ItemWordInTopic";
import Axios from "axios";
import { HOST } from "../constants/host_port"

export default function ItemTopicScreen(props) {
  const [listWord, setListWord] = useState([]);

  const { id } = props.route.params;

  useEffect(() => {
    Axios.get(`http://${HOST}:3000/topics/${id}`)
      .then((res) => {
        setListWord(res.data.data.words)
      })
      .catch(err => console.log("err: ", err))
  }, [])
  return (
    <List
      dataArray={listWord}
      renderItem={({ item }) => (
        <ItemWordInTopic item={item} />
      )}
      keyExtractor={item => item.id.toString()}
    />
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