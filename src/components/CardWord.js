import React from "react";
import { connect } from "react-redux";

import { View, StyleSheet} from "react-native"
import { Card, CardItem, Text, Body } from "native-base"
import Icon from 'react-native-vector-icons/MaterialIcons'

import {textToSpeechWithApiGoogle} from"../utils/google-api/text-to-speech";
import { translateText } from "../utils/controller"

function CardWord(props) {
  const {from, to} = props.languages;
  const item = props.item;
  const {word, proper} = props.item;
  console.log(item.result.pronunciation);
  const handleGoToWord = async() =>{
    // const mean = await translateText({
    //   from: from,
    //   to: to,
    //   word: word
    // })
    let mean = item.result;
    props.nav.navigate("Word", {wordMeaning: mean});
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
                <Text style={styles.proper}>{item.result.pronunciation}</Text>
                <Icon name="volume-up" size={25} color="#0077b3" onPress={speechText}/>
              </View>
            </View>
             :  
             <View style={styles.onlineCard}>
                <Text style={styles.word}>{item.word}</Text>
                <Icon name="volume-up" size={25} color="#0077b3" onPress={speechText}/>
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
    width: 160,
    marginRight:15
  },
  cardItem: {
    borderRadius: 15,
    backgroundColor: "#ffffff",
    borderColor:"#007acc",
    borderWidth:1
  },
   
  word: {
    fontSize: 25,
    height: 50,
    fontWeight: "bold",
    color:"#004466"
  },
  bottomCard:{
    flexDirection:"row",
    justifyContent:"space-between",
    width: 120,
    marginVertical:0
  },
  proper: {
    color: "#007acc",
    fontWeight: "bold",
  },
  onlineCard: {
    flexDirection:"row",
    justifyContent:"space-between",
    width: 120,
    marginVertical:0,
    height : 76,
    paddingTop : 18
  }
})

const mapStateToProps = (state) => ({
  languages :state.languages
})
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(CardWord)