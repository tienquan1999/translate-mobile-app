import React, {useState, useEffect} from "react"
import { StyleSheet,View, Button, TextInput} from "react-native"
import { Text, Body, Card, CardItem} from "native-base"

export default function InputTextQuestion(props)
{
  let { item, idx } = props;
  let { content} = item;
  let [answered, setAnswered] = useState(false);
  let [text, setText] = useState("");

  function checkAnswer(){
    if(item.correct_answer === text){
      props.updateCount(1);
    }else{
      props.updateCount(0);
    }
    setAnswered(true);
  }

  return (
    <Card>
    <CardItem header >
     <View>
      <Text style={{color: "#0077b3"}}>Câu {idx}: </Text>
      <Text>{content}</Text>
      </View>
    </CardItem>
    <CardItem disabled={true}>
      <Body>
      <TextInput editable={!answered} style={{borderColor: "black", height: 35, width: "95%", borderWidth: 1, fontSize: 20}} placeholder="Nhập đán án tại đây" value={text} onChangeText={ (value) => setText(value)} onSubmitEditing={() => {}}/>
      </Body>
    </CardItem>
    <Button title="Submit" disabled={answered} onPress={checkAnswer}/>
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