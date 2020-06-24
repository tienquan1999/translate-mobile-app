import React from "react";
import { connect } from "react-redux";

import { View, StyleSheet} from "react-native"
import { Card, CardItem, Text, Body } from "native-base"
import {MaterialIcons} from "@expo/vector-icons"

import {textToSpeechWithApiGoogle} from"../utils/google-api/text-to-speech";
import { translateText } from "../utils/controller"

function CardWord(props) {
  const {from, to} = props.languages;
  const item = props.item;
  const {word, proper} = props.item;
  console.log(item.result.data)
  const handleGoToWord = async() =>{
    // const mean = await translateText({
    //   from: from,
    //   to: to,
    //   word: word
    // })
    let mean = item.result;
    if(item.result.type === "offline")
      props.nav.navigate("Word", {wordMeaning: mean});
    else
      props.nav.navigate("SearchOnline", {wordMeaning: mean})
  }
  const speechText = async() =>{
    await textToSpeechWithApiGoogle(word, from)
  }
  return (
    <Card style={styles.card}>
      <CardItem style={styles.cardItem} button onPress={handleGoToWord}>
        <Body>
          {/* Todo
              check xem console.log(item.result.type) là online hay offline.
              Nếu là online thì nội dung của cả ô đấy là text + cái biểu tượng phát âm thôi
              Còn nếu là offline thì nội dung của cả ô đấy giống như cái đã có. nhưng thay vì hiển thị loại từ thì sẽ hiển thị phiên âm của từ đó
          */}
          {
            item.result.type ==='offline' ? 
            <View>
              <Text style={styles.word}>{item.word}</Text>
              <View style={styles.bottomCard}>
                <Text style={styles.proper}>{item.result.data.pronunciation}</Text>
                  <MaterialIcons name="volume-up" size={25} color="#0077b3"  onPress={speechText}/>
                 
              </View>
              <Text style={styles.mean}>{item.result.data.mean[0].values[0].mean}</Text>
            </View>
             :  
             <View >
                <Text style={styles.word}>{item.word}</Text>
                <View style={styles.bottomCard}>
                  <Text style={styles.proper}></Text>
                  <MaterialIcons name="volume-up" size={25} color="#0077b3"  onPress={speechText}/>
                </View>
                
             </View> 
          }
          
         
        </Body>
      </CardItem>
    </Card>);
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#ffffff",
    width : '94%',
    marginRight:15 ,
   },
  cardItem: {
    borderRadius: 15,
    backgroundColor: "#ffffff",
    borderColor:"#007acc",
    borderWidth:1,
    height : 150
  },
   
  word: {
    fontSize: 25,
    height: 50,
    fontWeight: "bold",
    color:"#004466"
  },  
  bottomCard:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  proper: {
    color: "#007acc",
    fontWeight: "bold",
    height : 20,
    width : '90%'
  },
   mean : {
     color : "#0077b3",
     fontStyle : "italic"
   }
})

const mapStateToProps = (state) => ({
  languages :state.languages
})
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(CardWord)