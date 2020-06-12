import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text, Content } from 'native-base';
import { connect } from "react-redux"
import Icon from 'react-native-vector-icons/MaterialIcons'
import {textToSpeechWithApiGoogle} from "../utils/google-api/text-to-speech"

function DetailWord(props) {
  let { wordMeaning } = props;
  let {from, to} = props.languages;

  console.log(wordMeaning);
  const dataWord = wordMeaning.data;
  const arrMean = dataWord.mean;

  const speechText = async() =>{
    await textToSpeechWithApiGoogle(dataWord.word, from)
  }
  return (
    <Content padder>
      <ScrollView>
        <Text style={styles.wordHeader}>{dataWord.word}</Text>
        <View style={styles.viewPronunciation}>
          <Icon name="volume-up" size={25} color="#0077b3" onPress={speechText} />
          <Text style={styles.pronunciation}>{dataWord.pronunciation}</Text>
        </View>
        {
          arrMean.map((e, index)=>
            <View key={index}>
              <Text style={styles.proper}><Icon name="chevron-right" size={15} />{e.type}</Text>
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
                          <Text style={styles.exmVie}><Icon name="chevron-right" />{ex.mean}</Text>
                        </View>)
                    }
                  </View>)
              }
            </View>
          )
        }
      </ScrollView>
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
    wordMeaning: state.wordMeaning.data,
    languages :state.languages
  }
}
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(DetailWord)