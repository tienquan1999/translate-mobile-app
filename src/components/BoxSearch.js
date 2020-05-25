import React from "react";
import { View, StyleSheet } from "react-native"
import { Icon, Item, Input } from "native-base"

export default function BoxSearch() {
  const [textSearch, onChangeText] = React.useState("");

  return (
    <View style={styles.viewBoxSearch}>
      <Item rounded style={styles.boxSearch}>
        <Icon name="search" />
        <Input
          onChangeText={text => onChangeText(text)}
          value={textSearch}
          placeholder="Gõ từ để tra từ điển" />
      </Item>
      <Icon name="mic" style={styles.styleIcon} />
    </View>
  )
}
const styles = StyleSheet.create({
  viewBoxSearch: {
    flexDirection: 'row',
    backgroundColor: "#3385ff",
    
    height: 60,
    alignItems: "center",

  },
  boxSearch: {
    height: 40,
    borderColor: '#3385ff',
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    width: 320,

  },
  styleIcon: {
    marginHorizontal: 10,
    color: "#ffffff"
  },
})