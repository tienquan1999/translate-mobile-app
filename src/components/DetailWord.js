import React, { useEffect, useState } from "react";
import { View, StyleSheet ,FlatList} from "react-native";
import { Text, Content } from 'native-base';
import { connect } from "react-redux"
import { MaterialIcons, AntDesign} from '@expo/vector-icons';
import {textToSpeechWithApiGoogle} from "../utils/google-api/text-to-speech";
import { translateText } from "../utils/controller"

function DetailWord(props) {
  let {route} = props;
  let {wordMeaning} = route.params;
  console.log("word: ", wordMeaning)
  let {from , to} = props.languages;
 
  const dataWord = wordMeaning.data;
 
  const arrMean = dataWord.mean;
  let newPronunciation = dataWord.pronunciation.split("; [us] ");
  console.log(props.item);
  const goToWord = async (item) => {
    if(item.trim() !== ''){
    
      const result = await translateText({
        from: from,
        to: to,
        word: item
      })
      if (result.type === "offline")
        props.navigation.navigate("Word", { wordMeaning: result });
      else if ((result.type === "online")){
        props.navigation.navigate("SearchOnline", { wordMeaning: result })
      }
    }

  }

  const speechText = async() =>{
    await textToSpeechWithApiGoogle(dataWord.word, from)
  }
  let mean = arrMean.map((e, index)=>
  <View key={index}>
    <Text style={styles.proper}>
      {/* <Icon name="chevron-right" size={15} /> */}
      {e.type}</Text>
    {
      e.values.map((type, index) =>
        <View key={index}>
          <Text style={styles.means}>
            <Text style={styles.indexMean}>{index + 1}.</Text>
            {type.mean}
          </Text>
          {
            type.examples.map((ex, keyEx) =>
              <View key={keyEx}>
                <Text style={styles.exmEng}>{ex.word}</Text>
                <Text style={styles.exmVie}>
                  {/* <Icon name="chevron-right" /> */}
                  {ex.mean}</Text>
              </View>)
          }
        </View>)
    }
  </View>
);

  return (
      <View style={styles.viewAround}>
        <View>
          <Text style={styles.wordHeader}>{dataWord.word}</Text>
          {
            from === "en" ? 
            <View>
            {
              newPronunciation.length === 1 ? 
                <View style={styles.viewPronunciation}>
                  <MaterialIcons name="volume-up" size={25}  color="#0077b3" onPress={speechText} />
                  <Text style={{color: "#0077b3"}}>[uk]</Text>
                  <Text style={styles.pronunciation}>{newPronunciation[0]}</Text>
                </View> : 
                <View>
                  <View style={styles.viewPronunciation}>
                    <MaterialIcons name="volume-up" size={25}  color="#0077b3" onPress={speechText} />
                    <Text style={{color: "#0077b3"}}>[uk]</Text>
                    <Text style={styles.pronunciation}>{newPronunciation[0]}/</Text>
                 </View>
                 <View style={styles.viewPronunciation}>
                  <MaterialIcons name="volume-up" size={25}  color="#0077b3" onPress={speechText} />
                  <Text style={{color: "#0077b3"}}>[us]</Text>
                  <Text style={styles.pronunciation}>/{newPronunciation[1]}</Text>
                </View>

                </View>
               
            }
            </View>
             : 
            <View style={styles.viewPronunciation}>
              <MaterialIcons name="volume-up" size={25}  color="#0077b3" onPress={speechText} />
              <Text style={styles.pronunciation}>{newPronunciation}</Text>
          </View>
          }
         
          
        </View>
        <View>
          <FlatList 
            data={arrMean}
            renderItem={({item, index })=>(
              <View >
                <Text style={styles.proper}><AntDesign name="right" size={15}/>{item.type}</Text>
                <FlatList
                  data ={item.values}
                  renderItem={({item,index}) =>(
                    <View key={index}>
                      <Text style={styles.means}><Text style={styles.indexMean}>{index+1}.</Text>{item.mean}</Text>
                      <FlatList 
                        data={item.examples}
                        renderItem ={({item, index}) =>(
                          <View key={index}>
                            <View style={{paddingLeft : 40 , maxWidth : 400}}>
                            <FlatList
                            horizontal ={true}
                            data={item.word.split(' ')}
                            renderItem={({item,index}) => (
                             
                              <View style={{paddingRight : 5}}>
                                <Text style={item.match(/^[^a-zA-Z0-9]+$/) ? styles.exmEngCha : styles.exmEng}  onPress={() => {goToWord(item)}}>{item}</Text>
                            
                              </View>
                            )}
                            keyExtractor = { item => Math.random().toString()}
                          />
                         </View>
                           
                            <Text style={styles.exmVie}><AntDesign name="right"/>{item.mean}</Text>
                          </View>
                        )}
                        keyExtractor={item =>item.word}
                      />
                    </View>
                  )}
                  keyExtractor ={item=> item.mean}
                />
              </View>
            )}
            keyExtractor={item => item.type}
          />
          
        </View>
        
       
     </View>
  )
}
const styles = StyleSheet.create({
  viewAround :{
    paddingLeft : 15,
    maxHeight : '75%'
  },
  wordHeader: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#005580"
  },
  viewPronunciation: {
    flexDirection: "row",
    paddingTop: 18,
    alignItems: "center",
    paddingBottom: 10
  },
  pronunciation: {
    paddingLeft: 20,
    fontSize: 18
  },
  proper: {
    color: "#0077b3",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 18,
    alignContent: "center"
  },
  indexMean: {
    fontSize: 17,
    color: "#bfbfbf"
  },
  means: {
    marginTop: 20,
    color: "#004466",
    fontSize: 17,
    paddingLeft: 15
  },
  exmEng: {
    fontStyle: "italic",
    color: "#007acc",
    paddingTop: 10,
    fontSize: 17,
    textDecorationLine : "underline"
  },
  exmEngCha : {
    fontStyle: "italic",
    color: "#007acc",
    paddingTop: 10,
    fontSize: 17,
  },

  exmVie: {
    color: "#595959",
    paddingTop: 10,
    fontSize: 17,
    paddingLeft: 40
  }
})
const mapStateToProps = (state) => {
  return {
    languages :state.languages
  }
}
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(DetailWord)