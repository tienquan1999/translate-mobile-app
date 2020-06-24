import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput } from "react-native"
import { Content, View, Textarea, Button, Container, Header, Title, Body, Left, Right } from "native-base"
import BoxSwitchLanguage from "../components/BoxSwitchLanguage";
import { switchLanguage } from "../actions/switchLanguage";
import { ACTION_LANGUAGE } from "../constants/languages";
import { connect } from "react-redux"
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { textToSpeechWithApiGoogle } from "../utils/google-api/text-to-speech"
import { translateWithGoogleApi } from "../utils/google-api/translate-api"
import { useFocusEffect } from '@react-navigation/native';

function SearchOnlineScreen(props) {

  let { from, to } = props.languages;
  let { params } = props.route;

  const [textFrom, setTextFrom] = useState("");
  const [textTo, setTextTo] = useState("");

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
        handleClearFrom();
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  useEffect(() => {
    if (params) {
      let { from, to, word, mean } = params.wordMeaning;
      setTextFrom(word)
      setTextTo(mean)
      props.switchLanguage(from, to, ACTION_LANGUAGE.CHANGE)
    }
    else
      props.switchLanguage("en", "vi", ACTION_LANGUAGE.CHANGE);
  }, [props.route])
  return (
    <Container>
      <Header style={styles.header}>
        <Left>
          <MaterialCommunityIcons name="earth" color="#ffffff" size={30}/>
        </Left>
        <Body>
          <Title style={styles.title}>{"Dịch Online "}</Title>
        </Body>
        <Right/>
      </Header>
      <Content padder style={styles.body}>
        <View style={styles.boxText}>
          <TextInput multiline={true} placeholder="Nhập để dịch" value={textFrom} style={styles.textarea} onChangeText={(value) => setTextFrom(value)} />
          <View style={styles.boxMedia}>
            {textFrom !== "" && <MaterialIcons name="close" size={25} style={styles.iconClose} onPress={handleClearFrom} />}
            <MaterialIcons name="volume-up" size={25} color="#0077b3" style={styles.iconSound} onPress={() => speechText("from")} />
          </View>
        </View>
        <View style={styles.boxBtn}>
          <BoxSwitchLanguage />
          <Button style={styles.btnTranslate} onPress={translateOnline}>
            <Text style={styles.textBtn}>{"Dịch"}</Text>
          </Button>
        </View>
        <View style={styles.boxText}>
          <Text multiline={true} style={styles.textTo}>{textTo}</Text>
          <View>
            <MaterialIcons name="volume-up" size={25} color="#0077b3" style={styles.iconSound} onPress={() => speechText("to")} />
          </View>
        </View>
      </Content>
    </Container>
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff'
  },
  header: {
    backgroundColor: "#0077b3"
  },
  title: {
    color: "#ffffff",
    paddingLeft: 10
  },
  boxMedia: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  btnTranslate: {
    backgroundColor: "#0099e6",
    color: "#ffffff",
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
  boxText: {
    flexDirection: "row",
    borderColor: "#0077b3",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 10,
    minHeight: 100,
    marginVertical: 10,
    paddingVertical: 10,
    flex: 1
  },
  textarea: {
    fontSize: 20,
    flex: 3,
    paddingHorizontal: 10,
    textAlignVertical: "top"
  },
  textTo: {
    fontSize: 20,
    flex: 3,
    paddingHorizontal: 10
  },
  iconClose: {
    color: "#0077b3",
    marginTop: 10
  },
  boxBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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