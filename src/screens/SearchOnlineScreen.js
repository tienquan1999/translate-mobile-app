import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, Text } from "react-native"
import { Content, Button, View, Textarea } from "native-base"
import BoxSwitchLanguage from "../components/BoxSwitchLanguage";
import { switchLanguage } from "../actions/switchLanguage";
import { ACTION_LANGUAGE } from "../constants/languages";
import { searchOnl } from "../actions/searchOnl"
import { connect } from "react-redux"
import Icon from 'react-native-vector-icons/MaterialIcons'
import {textToSpeechWithApiGoogle} from "../utils/google-api/text-to-speech"

function SearchOnlineScreen(props) {

  let { wordMeaning } = props
  let { from, to } = props.languages;
  let { params } = props.route;

  const [textFrom, setTextFrom] = useState(params ? params.word : "");
  const [textTo, setTextTo] = useState(params ? params.mean : "");
  const [change, setChange] = useState(false);

  const translateOnline = async () => {
    await props.searchOnl(from, to, textFrom);
    setChange(true)
  }
  const handleClearFrom = () => {
    setTextFrom("")
    setTextTo("")
  }
  const speechText = async(type) =>{
    console.log("text from: ", textFrom, "text to: ", textTo, from, to)
    if(type === "from")
      await textToSpeechWithApiGoogle(textFrom, from)
    else
      await textToSpeechWithApiGoogle(textTo, to)
  }
  useMemo(() => {
    change && setTextTo(wordMeaning.mean);
    setChange(false)
  }, [wordMeaning])
  useEffect(()=>{
    props.switchLanguage("en","vi", ACTION_LANGUAGE.CHANGE);
  },[])
  return (
    <Content padder style={styles.body}>
      <View style={styles.boxText}>
        <Textarea placeholder="Nhập để dịch" value={textFrom} style={styles.textarea} onChangeText={(value) => setTextFrom(value)}/>
        <View style={styles.boxMedia}>
          {textFrom !== "" && <Icon name="close" size={25} style={styles.iconClose} onPress={handleClearFrom} />}
          <Icon name="volume-up" size={25} color="#0077b3" style={styles.iconSound} onPress={() => speechText("from")}/>
        </View>
      </View>
      <BoxSwitchLanguage />
      <View style={styles.viewBtn}>
        <Button style={styles.btnTranslate} onPress={translateOnline}>
          <Text style={styles.textBtn}>Dịch</Text>
        </Button>
      </View>
      <View style={styles.boxText}>
        <Text multiline={true} style={styles.textarea}>{textTo}</Text>
        <View>
          <Icon name="volume-up" size={25} color="#0077b3" style={styles.iconSound} onPress={() => speechText("to")} />
        </View>
      </View>
    </Content>
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff'
  },
  boxText: {
    flexDirection: "row",
    borderColor: "#0077b3",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 10,
    height: 100,
    marginVertical: 10,
    paddingVertical: 10,
    flex: 1
  },
  boxMedia: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  btnTranslate: {
    backgroundColor: "#0077b3",
    height: 50,
    width: 80,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center"
  },
  textBtn: {
    color: "#ffffff",
    fontSize: 20
  },
  iconSound: {
    flex: 1
  },
  textarea: {
    fontSize: 20,
    flex: 3
  },
  iconClose: {
    color: "#0077b3",
    marginTop: 10
  },
  viewBtn: {
    flexDirection: "column",
    alignItems: "center"
  }
})
const mapStateToProps = (state) => {
  return {
    wordMeaning: state.wordMeaning.data,
    languages: state.languages,
  }
}
const mapDispatchToProps = (dispatch) => ({
  searchOnl: (from, to, word) => dispatch(searchOnl(from, to, word)),
  switchLanguage: (from, to, action) => dispatch(switchLanguage(from, to, action))
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchOnlineScreen);