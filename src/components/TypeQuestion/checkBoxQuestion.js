import React, { useState, useEffect } from "react"
import { StyleSheet,View, Button,TouchableOpacity} from "react-native"
import { Text,ListItem, List, Body, Card, CardItem, CheckBox} from "native-base"
import {Feather} from "@expo/vector-icons"
export default function CheckBoxQuestion(props) {
  let { item, idx } = props;
  let { content, Answers } = item;

  let [listCheck, updateListCheck] = useState([]);
  let [answered, setAnswered] = useState(false);
  let [response, setResponse] = useState("");


  useEffect(() => {
    let arr = [...listCheck];
    arr = Answers.map(e => {return {id_answer: e.id_answer, checked: false}})
    updateListCheck(arr);
  }, [props.item])
  
  function fillToCheckBox(id_answer){
    if(!answered){
      let index = listCheck.findIndex(e => e.id_answer === id_answer);
      let newArr = [...listCheck]
      newArr[index].checked = !newArr[index].checked;
      updateListCheck(newArr)
    }
  }

  function checkAnswer(){
    let correct_answers = item.correct_answer.split(",");
    let count = 0;
    for(let e of listCheck){
      if(e.checked === true){
        count++;
      }
    }
    let check = true;
    if(count === correct_answers.length){
      for(let e of correct_answers){
        let index = listCheck.findIndex(ele => {
          return ele.id_answer === e && ele.checked === true;
        })
        if(index < 0){
          check=false;
          break;
        }
      }
    }else{
      check=false;
    }
    setAnswered(true);
    if(check === false){
      let correct_answers = item.correct_answer.split(",");
      props.updateCount(0);
      console.log(Answers);
      console.log(correct_answers);
      let arr = Answers.filter(e => {
        if(correct_answers.findIndex(f => f === e.id_answer) >= 0){
          return e;
        }
      }).map(e => e.content);
      setResponse(`Đáp án chính xác là: ${arr.join(" và ")}`);
    }else{
      props.updateCount(1);
      setResponse(`Chính xác.`);
    }
  }
  return (
    listCheck.length > 0 ? (
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
              <ListItem style={styles.question} onPress={() => {
                fillToCheckBox(item.id_answer)
              }}>
                <CheckBox disabled={answered} checked={listCheck[listCheck.findIndex(e => e.id_answer === item.id_answer)].checked} onPress={() => {
                fillToCheckBox(item.id_answer)
              }}/>
                <Text style={styles.txt}>{item.content}</Text>
              </ListItem>
            )}
          />
           
        </Body>
      </CardItem>
      {
      (!answered) ? (
        <TouchableOpacity title="Submit" disabled={answered}  onPress={checkAnswer} style={styles.buttonSubmit}>
            <Text style={styles.textSubmit}>Submit</Text>
          </TouchableOpacity>
      ) : (
        <View >
          <Text style={{color: "red", fontSize: 16, textAlign:"center"}}>{response}</Text>
        </View>
      )
      }
      <CardItem footer />
    </Card>
    ) : 
    (
      <View style={{ flexDirection : "row",justifyContent : "center"}}><Feather name="loader" size ={30}  color="#0077b3"/></View>
    )
  )
}
const styles = StyleSheet.create({
  question: {
    flexDirection: "row",
    alignItems: "center"
  },
  header: {
    // flexDirection: "row",
    // alignItems: "flex-start",
    // padding:10
  },
  txt: {
    paddingLeft: 10,
    flexWrap: "wrap"
  },
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