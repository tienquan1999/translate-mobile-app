import React, { useEffect, useState } from "react";
import { View, StyleSheet ,FlatList} from "react-native";
import { Text, Content } from 'native-base';
import { connect } from "react-redux"
import { MaterialIcons, AntDesign} from '@expo/vector-icons';
import {textToSpeechWithApiGoogle} from "../utils/google-api/text-to-speech"

function DetailWord(props) {
  let {route} = props;
  let {wordMeaning} = route.params;

  let {from} = props.languages;

  const dataWord = wordMeaning.data;
  const arrMean = dataWord.mean;

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
    <Content padder>
      <View>
        <Text style={styles.wordHeader}>{dataWord.word}</Text>
        <View style={styles.viewPronunciation}>
          <MaterialIcons name="volume-up" size={25}  color="#0077b3" onPress={speechText} />
          <Text style={styles.pronunciation}>{dataWord.pronunciation}</Text>
        </View>
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
                          <Text style={styles.exmEng}>{item.word}</Text>
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
    </Content>
  )
}
const styles = StyleSheet.create({
  wordHeader: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#005580"
  },
  viewPronunciation: {
    flexDirection: "row",
    paddingTop: 18,
    alignItems: "center"
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
    paddingLeft: 40
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