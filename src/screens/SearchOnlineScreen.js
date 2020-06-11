import React, { useState, useMemo } from "react";
import { StyleSheet, Text } from "react-native"
import { Content, Button, View, Textarea } from "native-base"
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
    setTextTo("")
  }
  useMemo(() => {
    change && setTextTo(wordMeaning.mean);
    setChange(false)
  }, [wordMeaning])

  return (
    <Content padder style={styles.body}>
      <View style={styles.boxText}>
        <Textarea placeholder="Nhập để dịch" value={textFrom} style={styles.textarea}
          onChangeText={(value) => setTextFrom(value)} />
        <View style={styles.boxMedia}>
          {textFrom !== "" && <Icon name="close" size={25} style={styles.iconClose} onPress={handleClearFrom} />}
          <Icon name="volume-up" size={25} color="#0077b3" style={styles.iconSound} />
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
          <Icon name="volume-up" size={25} color="#0077b3" style={styles.iconSound} />
        </View>
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
        
        justifyContent : "center"
    },
    textBtn: {
        color: "#ffffff",
        fontSize: 20
    },
    icon :{
        
        marginTop: 30,
         
        
    },
    textarea : {
         width : "90%",
        height : "80%",
        paddingTop : 10, fontSize : 20
    },
    iconClose:{
        color: "#0077b3",
        marginTop: 10
      },
    viewBtn :{
        flexDirection : "column",
        alignItems : "center"
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