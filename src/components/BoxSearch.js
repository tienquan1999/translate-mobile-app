import React, {useState} from "react";
import { StyleSheet, TouchableHighlight, View, Modal , Text} from "react-native"
import { Icon, Item, Input, Header} from "native-base"
import { connect } from "react-redux";
import { translateText } from "../utils/controller"

function BoxSearch(props) {

  const [textSearch, onChangeText] = useState("");
  let {from, to} = props.languages;
  const [modalVisible, setModalVisible] = useState(false);
  
  const goToWord = async() =>{
    const result = await translateText({
      from: from,
      to: to,
      word: textSearch
    })
    if(result.type === "offline")
      props.navigation.navigate("Word", {wordMeaning: result});
    else
      props.navigation.navigate("SearchOnline", {wordMeaning: result})
  }
  const handleClear = () =>{
    onChangeText("")
  }

  return (
    <Header searchBar rounded style={styles.header}>
      <Item style={styles.boxSearch}>
        <Icon name="search" />
        <Input placeholder="Search" value={textSearch} onChangeText={(text) => onChangeText(text)} onSubmitEditing={goToWord}/>
        {textSearch !== "" &&  <Icon name="close" style={styles.iconClose} onPress={handleClear}/>}
      </Item>
      <Icon name="mic" style={styles.iconMic} onPress={() => {setModalVisible(true);}}></Icon>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </Header>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0077b3",
    alignItems: "center",
    justifyContent:"space-around"
  },
  boxSearch: {
    borderColor: '#0077b3',
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  iconMic: {
    color: "#ffffff",
    paddingLeft:10
  },
  iconClose:{
    color: "#0077b3",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

const mapStateToProps = (state) =>{
  return {
    languages :state.languages,
  }
}
const mapDispatchToProps = (dispatch) =>({
})
export default connect(mapStateToProps, mapDispatchToProps)(BoxSearch)