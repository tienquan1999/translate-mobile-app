import React from "react"
import { StyleSheet,View , CheckBox} from "react-native"
import { Text,ListItem, List, Body, Card, CardItem } from "native-base"

export default function CheckBoxQuestion(props) {
  let { item, idx } = props;
  const { content, Answers } = item;

  return (
    <Card>
      <CardItem header >
       <View>
        <Text style={{color: "#0077b3"}}>Câu {idx}: </Text>
        <Text>{content}</Text>
        </View>
      </CardItem>
      <CardItem>
        <Body>
          <List
            dataArray={Answers}
            keyExtractor={item => item.id_answer.toString()}
            renderItem={({ item }) => (
              <ListItem style={styles.question}>
                <CheckBox />
                <Text style={styles.txt}>{item.content}</Text>
              </ListItem>
            )}
          />
        </Body>
      </CardItem>
      <CardItem footer />
    </Card>
  )
}
const styles = StyleSheet.create({
  question: {
    flexDirection: "row",
    alignItems: "center",
    flex:1
  },
  header: {
    // flexDirection: "row",
    // alignItems: "flex-start",
    // padding:10
  },
  txt: {
    paddingLeft: 10,
    flexWrap: "wrap"
  }
})