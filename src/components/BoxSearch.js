import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, TouchableWithoutFeedback, View, Modal, Text } from "react-native"
import { Icon, Item, Input, Header } from "native-base"
import { connect } from "react-redux";
import { translateText } from "../utils/controller"
import IconClose from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from '@react-navigation/native';

function BoxSearch(props) {

  const [textSearch, onChangeText] = useState("");
  let { from, to } = props.languages;
  const [modalVisible, setModalVisible] = useState(false);

  const goToWord = async () => {
    const result = await translateText({
      from: from,
      to: to,
      word: textSearch
    })
    if (result.type === "offline")
      props.navigation.navigate("Word", { wordMeaning: result });
    else
      props.navigation.navigate("SearchOnline", { wordMeaning: result })
  }
  const handleClear = () => {
    onChangeText("")
  }
  const showModal = () => {
    setModalVisible(true);
  }
  const hideModal = () => {
    setModalVisible(false);
  }
  useFocusEffect(
    React.useCallback(() => {
      
     // Do something when the screen is focused
     
      return () => {
       handleClear();
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <Header searchBar rounded style={styles.header}>
      <Item style={styles.boxSearch}>
        <Icon name="search" />
        <Input autoFocus={false}  placeholder="Search" value={textSearch} onChangeText={(text) => onChangeText(text)} onSubmitEditing={goToWord} />
        {textSearch !== "" && <Icon name="close" style={styles.iconClose} onPress={handleClear} />}
      </Item>
      <Icon name="mic" style={styles.iconMic} onPress={showModal}></Icon>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <IconClose name="close" size={25} color="#bfbfbf" onPress={hideModal} />
            </View>
            <View style={styles.modalBody}>
              
            </View>
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
    justifyContent: "space-around"
  },
  boxSearch: {
    borderColor: '#0077b3',
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  iconMic: {
    color: "#ffffff",
    paddingLeft: 10
  },
  iconClose: {
    color: "#0077b3",
  },
  centeredView: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    elevation: 2
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    
    height: 250,
    width:250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalHeader: {
    padding:10,
    height: 50,
    position:"absolute",
    top:0,
    right:0,
    left:0,
    flexDirection:"row",
    justifyContent:"flex-end"
  },
  modalBody:{
    position:"absolute",
    top:60,
    right:0,
    left:0,
    bottom:0
  }
})

const mapStateToProps = (state) => {
  return {
    languages: state.languages,
  }
}
const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(BoxSearch)