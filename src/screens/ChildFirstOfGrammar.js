import React from "react"
import { Left, Right, Text, List, ListItem } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"

export default function ChildFirstOfGrammar(props) {

  const { SentenceChildren, id_sentence } = props.route.params;

  return (
    <List
      dataArray={SentenceChildren}
      renderItem={({ item }) => {
        return (
          <ListItem onPress={() =>
            props.navigation.navigate("ChildSecond",
              { title: item.name, id_sentence: id_sentence, id_sentence_child: item.id_sentence_child })}
          >
            <Left>
              <Text style={{color:"#0077b3"}}>{item.name}</Text>
            </Left>
            <Right>
              <MaterialIcons name="keyboard-arrow-right" color="#bfbfbf" size={30} />
            </Right>
          </ListItem>
        )
      }}
      keyExtractor={item => item.id_sentence_child.toString()}
    />
  )
}
