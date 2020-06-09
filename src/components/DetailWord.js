import React from "react";
import { View,StyleSheet, Image, ScrollView } from "react-native";
 
import {Header, Left, Body, Right, Button, Icon ,Text} from 'native-base';
import {connect} from "react-redux"
function DetailWord(props) {
  const {wordMeaning}=props;
  console.log(wordMeaning);
  const dataWord = wordMeaning.data;
  let arrMean = dataWord.mean ;
  let arrMeanNew = arrMean.splice((arrMean.length-1),1)
  
  return (

    <View style={styles.body}>
      <ScrollView>
        <Text style={styles.wordHeader}>{ dataWord.word}</Text>
        <View>
          <View style={styles.viewPronunciation}>
            <Image style={styles.image} source={require('../icon/listen.png')} />
            <Text style={styles.pronunciation}>{dataWord.pronunciation }</Text>
          </View>
         
        </View>
        <View>
          {arrMean.map(e => <View key={e.id}>
                <Text style={styles.proper}>{e.type}</Text>
                <Text style={styles.means}>{e.item1.txt}</Text>
                
              </View>
              )}
        </View>
      </ScrollView>
    </View>
     
     
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    height: "100%"
  },
  wordHeader: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000077",
    paddingTop: 30,
  },
  image: {
    height: 20,
    width: 20,
  },
  proper: {
    color:  "#0077b3",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 20,
  },
  means: {
    marginTop: 20,
    color: "#000077",
    paddingLeft: 50
  },
  viewPronunciation :{
    flexDirection : "row",
    paddingTop : 20
  },
  pronunciation : {
    paddingLeft : 20
  }
})
const mapStateToProps = (state) =>{
  console.log("state: ", state)
  return {
    wordMeaning: state.wordMeaning.data
  }
}
const mapDispatchToProps = (dispatch) =>({
})
export default connect(mapStateToProps, mapDispatchToProps)(DetailWord)