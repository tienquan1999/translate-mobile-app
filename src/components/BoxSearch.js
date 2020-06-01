import React, {useState} from "react";
import { StyleSheet } from "react-native"
import { Icon, Item, Input, Header} from "native-base"
const {transalteText} = require("../utils/controller");

export default function BoxSearch() {

  const [textSearch, onChangeText] = useState("");
  const handleChangeText = (e) =>{
    let val = e.target.value;
    onChangeText(val)
  }
  const goToWord = () =>{
    const result = transalteText("en", "vi", textSearch);
    console.log(result);
    //props.nav.navigate('Word', {word: item.word,proper: item.proper, mean: item.mean})
  }
  return (
    <Header searchBar rounded style={styles.header}>
      <Item style={styles.boxSearch}>
        <Icon name="search" />
        <Input placeholder="Search" value={textSearch} onChange={handleChangeText} onSubmitEditing={goToWord}/>
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
})