import React, {useState} from "react"
import { StyleSheet,View,TouchableOpacity} from "react-native"
import { Text, Body, Card, CardItem} from "native-base"
import RadioForm from 'react-native-simple-radio-button';



export default function RadioQuestion(props)
{
  let { item, idx } = props;
  let { content, Answers } = item;
  let [answered, setAnswered] = useState(false);
  let [value, setValue] = useState("");
  let [response, setResponse] = useState("");


  var radio_props = Answers.map(e => {
    return {
      label: e.content,
      value: e.id_answer
    }
  });

  function checkAnswer(){
    setAnswered(true);
    if(item.correct_answer === value){
      props.updateCount(1);
      setResponse("Chính xác.")
    }else{
      props.updateCount(0);
      let index = radio_props.findIndex(e => e.value === item.correct_answer);
      setResponse(`Đáp án đúng là: ${radio_props[index].label}`)
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
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => setValue(value)}
          />
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