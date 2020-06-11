import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native"
import { Content, Input, Button, View, TextInput, Textarea } from "native-base"
import BoxSwitchLanguage from "../components/BoxSwitchLanguage";
import { searchOnl } from "../actions/searchOnl"
import { connect } from "react-redux"
import Icon from 'react-native-vector-icons/MaterialIcons'

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
  }
  useEffect(() => {
    if (change) {
      setTextTo(props.wordMeaning.mean);
      setChange(false)
    }
  }, [props.wordMeaning])
  return (
    <Content padder style={styles.body}>
      <View style={styles.inputText}>
        <Textarea multiline={true} placeholder="Nhập để dịch" value={textFrom} style={styles.textarea}
          onChangeText={(value) => setTextFrom(value)} />
        <View>
          {textFrom !== "" && <Icon name="close" size={20} style={styles.iconClose} onPress={handleClearFrom} />}
          <Icon name="volume-up" size={20} color="#0077b3" style={styles.icon} />
        </View>
      </View>
      <BoxSwitchLanguage />
      <View style={styles.viewBtn}>
        <Button style={styles.btnTranslate} onPress={translateOnline}>
          <Text style={styles.textBtn}>Dịch</Text>
        </Button>
      </View>
      <View style={styles.inputText}>
        <Textarea multiline={true} value={textTo} style={styles.textarea} onChangeText={(value) => setTextTo(value)} />
        <Icon name="volume-up" size={20} color="#0077b3" style={styles.icon} />
      </View>
    </Content>
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff'
  },
  inputText: {
    flexDirection: "row",
    borderColor: "#0077b3",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 10,
    height: 150,
    marginVertical: 10,
    fontSize: 20
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
  icon: {
    marginTop: 30,
  },
  textarea: {
    width: 330,
    height: 130,
    paddingTop: 10, fontSize: 20
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
  searchOnl: (from, to, word) => dispatch(searchOnl(from, to, word))
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchOnlineScreen);