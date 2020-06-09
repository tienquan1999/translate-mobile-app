import React, {useState} from "react";
import { StyleSheet } from "react-native"
import { Icon, Item, Input, Header, Button} from "native-base"
import {searchText} from "../actions/searchText"
import { connect } from "react-redux";

function BoxSearch(props) {

  const [textSearch, onChangeText] = useState("");
  
  const goToWord = () =>{
    props.searchText("en", "vi", textSearch);
    props.navigation.navigate('Word')
  }
  const handleClear = () =>{
    onChangeText("")
  }
  return (
    <Header searchBar rounded style={styles.header}>
      <Item style={styles.boxSearch}>
        <Icon name="search" />
        <Input placeholder="Search" value={textSearch} onChangeText={(text) => onChangeText(text)} onSubmitEditing={goToWord}/>
        {textSearch !== "" && <Button style={styles.buttonClose} onPress={handleClear}><Icon name="close" style={styles.iconClose}/></Button>}
      </Item>
      <Icon name="mic" style={styles.iconMic} />
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
  buttonClose:{
    borderRadius: 50,
    borderWidth:2,
    borderStyle:"solid",
    borderColor:"#0077b3",
    backgroundColor:"#ffffff",
    
  }
})

const mapStateToProps = (state) =>{
  console.log("state: ", state)
  return {
    wordMeaning: state.wordMeaning.data
  }
}
const mapDispatchToProps = (dispatch) =>({
  searchText: (from, to, word) => dispatch(searchText(from, to, word))
})
export default connect(mapStateToProps, mapDispatchToProps)(BoxSearch)