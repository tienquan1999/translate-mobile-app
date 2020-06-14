import React from "react";
import { connect } from "react-redux";

import { View, StyleSheet} from "react-native"
import { Card, CardItem, Text, Body } from "native-base"
import Icon from 'react-native-vector-icons/MaterialIcons'

import {searchText} from "../actions/searchText"
import {textToSpeechWithApiGoogle} from"../utils/google-api/text-to-speech";

function CardWord(props) {
  const {from, to} = props.languages;
  const {word, proper} = props.item;
  
  const handleGoToWord = async() =>{
    await props.searchText(from, to, word)
    props.nav.navigate('Word');
  }
  const speechText = async() =>{
    await textToSpeechWithApiGoogle(word, from)
  }
  return (
    <Card style={styles.card}>
      <CardItem style={styles.cardItem} button onPress={handleGoToWord}>
        <Body>
          <Text style={styles.word}>{word}</Text>
          <View style={styles.bottomCard}>
            <Text style={styles.proper}>{proper}</Text>
            <Icon name="volume-up" size={25} color="#0077b3" onPress={speechText}/>
          </View>
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
  }
})

const mapStateToProps = (state) => ({
  languages :state.languages
})
const mapDispatchToProps = (dispatch) => ({
  searchText: (from, to, word) => dispatch(searchText(from, to, word))
})
export default connect(mapStateToProps, mapDispatchToProps)(CardWord)