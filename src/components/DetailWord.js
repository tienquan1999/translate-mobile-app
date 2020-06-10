import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text } from 'native-base';
import { connect } from "react-redux"
function DetailWord(props) {

  let { wordMeaning } = props;
  const dataWord = wordMeaning.data;
  const arrMean = dataWord.mean;

  return (

    <View style={styles.body}>
      <ScrollView>
        <Text style={styles.wordHeader}>{dataWord.word}</Text>
        <View style={styles.viewPronunciation}>
          <Image style={styles.image} source={require('../icon/listen.png')} />
          <Text style={styles.pronunciation}>{dataWord.pronunciation}</Text>
        </View>
        {
          arrMean.map(e =>
            <View key={e.id}>
              <Text style={styles.proper}>{e.type}</Text>
              {
                e.values.map((en, index) =>
                  <View key={index}>
                    <Text style={styles.means}>{en.mean}</Text>
                    {
                      en.examples.map((em, keyEx) =>
                        <View key={keyEx}>
                          <Text style={styles.exmEng}>{em.word}</Text>
                          <Text style={styles.exmVie}><Image style={styles.image2} source={require('../icon/circle-gray.png')} />{em.mean}</Text>
                        </View>)
                    }
                  </View>)
              }
            </View>
          )
        }
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    height: "100%",
    paddingBottom: 50
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
    color: "#0077b3",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 20,
  },
  means: {
    marginTop: 20,
    color: "#000077",
    paddingLeft: 50
  },
  viewPronunciation: {
    flexDirection: "row",
    paddingTop: 20
  },
  pronunciation: {
    paddingLeft: 20
  },
  exmEng: {
    paddingLeft: 60,
    fontStyle: "italic",
    color: "#3E7FC1",
    paddingTop: 10
  },
  exmVie: {
    paddingLeft: 60,
    color: "gray",
    paddingTop: 10,
  },
  image2: {
    width: 10,
    height: 10,

  }
})
const mapStateToProps = (state) => {
  return {
    wordMeaning: state.wordMeaning.data
  }
}
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(DetailWord)