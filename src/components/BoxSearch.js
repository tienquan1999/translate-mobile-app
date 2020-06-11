import React, {useState, useMemo} from "react";
import { StyleSheet } from "react-native"
import { Icon, Item, Input, Header} from "native-base"
import {searchText} from "../actions/searchText"
import { connect } from "react-redux";
function BoxSearch(props) {

  const [textSearch, onChangeText] = useState("");
  let {from, to} = props.languages;
  const [change, setChange] = useState(false);

  let {wordMeaning} = props;

  const goToWord = () =>{
    props.searchText(from, to, textSearch);
    setChange(true)
  }
  useMemo(()=>{
    if(change)
    {
      if(wordMeaning.type === "online")
      {
        const {word, mean} = wordMeaning;
        props.navigation.navigate('SearchOnline', {word: word, mean:mean});
      }
      else
        props.navigation.navigate('Word')
      
      setChange(false)
    }
  }, [props.wordMeaning])

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
})

const mapStateToProps = (state) =>{
  return {
    wordMeaning: state.wordMeaning.data,
    languages :state.languages,
  }
}
const mapDispatchToProps = (dispatch) =>({
  searchText: (from, to, word) => dispatch(searchText(from, to, word))
})
export default connect(mapStateToProps, mapDispatchToProps)(BoxSearch)