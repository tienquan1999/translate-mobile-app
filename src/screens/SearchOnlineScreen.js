import React, { useState, useEffect } from "react";
import { StyleSheet, Text, } from "react-native"
import { Content, View, Textarea, Button } from "native-base"
import BoxSwitchLanguage from "../components/BoxSwitchLanguage";
import { switchLanguage } from "../actions/switchLanguage";
import { ACTION_LANGUAGE } from "../constants/languages";
import { connect } from "react-redux"
import Icon from 'react-native-vector-icons/MaterialIcons'
import { textToSpeechWithApiGoogle } from "../utils/google-api/text-to-speech"
import { translateWithGoogleApi } from "../utils/google-api/translate-api"
import { useFocusEffect } from '@react-navigation/native';

function SearchOnlineScreen(props) {

  let { from, to } = props.languages;
  let { params } = props.route;
  
  const [textFrom, setTextFrom] = useState(params ? params.wordMeaning.word : "");
  const [textTo, setTextTo] = useState(params ? params.wordMeaning.mean : "");

  const translateOnline = async () => {
    const result = await translateWithGoogleApi({
      from: from,
      to: to,
      word: textFrom
    })
    setTextTo(result.mean)
  }
  const handleClearFrom = () => {
    setTextFrom("")
    setTextTo("")
  }
  const speechText = async (type) => {
    if (type === "from")
      await textToSpeechWithApiGoogle(textFrom, from)
    else
      await textToSpeechWithApiGoogle(textTo, to)
  }
  useFocusEffect(
    React.useCallback(() => {
      

      return () => {
        //handleClearFrom();
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  useEffect(() => {
    if(params)
    {
      const {from, to} = params.wordMeaning;
      props.switchLanguage(from, to, ACTION_LANGUAGE.CHANGE)
    }
    else
      props.switchLanguage("en", "vi", ACTION_LANGUAGE.CHANGE);
  }, [])
  return (
    <Content padder style={styles.body}>
      <View style={styles.boxText}>
        <Textarea placeholder="Nhập để dịch" value={textFrom} style={styles.textarea} onChangeText={(value) => setTextFrom(value)} />
        <View style={styles.boxMedia}>
          {textFrom !== "" && <Icon name="close" size={25} style={styles.iconClose} onPress={handleClearFrom} />}
          <Icon name="volume-up" size={25} color="#0077b3" style={styles.iconSound} onPress={() => speechText("from")} />
        </View>
      </View>
      <View style={styles.boxBtn}>
        <BoxSwitchLanguage />
        <Button style={styles.btnTranslate} onPress={translateOnline}>
          <Text style={styles.textBtn}>{"Dịch"}</Text>
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
    backgroundColor: "#3385ff",
    color:"#ffffff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  textBtn: {
    color: "#ffffff",
    fontSize: 18
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
  boxBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center"
  }
})
const mapStateToProps = (state) => {
  return {
    languages: state.languages,
  }
}
const mapDispatchToProps = (dispatch) => ({
  switchLanguage: (from, to, action) => dispatch(switchLanguage(from, to, action))
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchOnlineScreen);