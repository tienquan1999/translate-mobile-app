import React, {useState, useEffect} from "react"
import { StyleSheet,View, Button,TouchableOpacity} from "react-native"
import { Text, Body, Card, CardItem} from "native-base"
import RadioForm from 'react-native-simple-radio-button';



export default function RadioQuestion(props)
{
  let { item, idx } = props;
  let { content, Answers } = item;
  let [answered, setAnswered] = useState(false);
  let [value, setValue] = useState("");

  var radio_props = Answers.map(e => {
    return {
      label: e.content,
      value: e.id_answer
    }
  });

  function checkAnswer(){
    if(item.correct_answer === value){
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
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => setValue(value)}
          />
        </Body>
      </CardItem>
      <TouchableOpacity title="Submit" disabled={answered}  onPress={checkAnswer} style={styles.buttonSubmit}>
            <Text style={styles.textSubmit}>Submit</Text>
          </TouchableOpacity>
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
    height : 45,
    backgroundColor : "#0077b3",
    
   borderRadius : 4 ,
   marginTop : 30,
   marginLeft: 50 
  },
  textSubmit :{
    color : "#ffffff",
    fontSize : 20,
    fontWeight : "bold",
    textAlign : "center",
    marginTop :6
  }
})