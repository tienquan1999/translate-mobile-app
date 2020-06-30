import React, {useState, useEffect} from "react"
import { StyleSheet,View, Button, TextInput,TouchableOpacity} from "react-native"
import { Text, Body, Card, CardItem} from "native-base"

export default function InputTextQuestion(props)
{
  let { item, idx } = props;
  let { content} = item;
  let [answered, setAnswered] = useState(false);
  let [text, setText] = useState("");
  let [response, setResponse] = useState("");

  function checkAnswer(){
    setAnswered(true);
    if(item.correct_answer === text){
      props.updateCount(1);
      setResponse(`Chính xác.`);
    }else{
      props.updateCount(0);
      setResponse(`Đáp án đúng là: ${item.correct_answer}`);
    }
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
      <TextInput editable={!answered} style={{borderColor: "#0077b3", height: 40, width: "95%", borderWidth: 2, fontSize: 16 ,borderRadius: 4, padding:5}} placeholder="Nhập đán án tại đây" value={text} onChangeText={ (value) => setText(value)} onSubmitEditing={() => {}}/>
      </Body>
    </CardItem>
    {
      (!answered) ? (
        <TouchableOpacity title="Submit" disabled={answered}  onPress={checkAnswer} style={styles.buttonSubmit}>
            <Text style={styles.textSubmit}>Submit</Text>
          </TouchableOpacity>
      ) : (
        <View>
          <Text style={{color: "red", fontSize: 16, textAlign:"center"}}>{response}</Text>
        </View>
      )
    }
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
  ,
  buttonSubmit : {
    width : '70%',
    height : 40,
    backgroundColor : "#0077b3",
    
   borderRadius : 4 ,
   marginTop : 30,
   marginLeft: 60 
  },
  textSubmit :{
    color : "#ffffff",
    fontSize : 16,
    fontWeight : "bold",
    textAlign : "center",
    padding:10
  }
})