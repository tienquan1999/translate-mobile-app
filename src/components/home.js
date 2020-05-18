import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Icon } from "native-base"

const styles = StyleSheet.create({
  viewBoxSearch: {
    flexDirection: 'row',
    backgroundColor:"#6495ed"
  },
  boxSearch: {
    height: 40,
    borderColor: 'gray',
    borderRadius: "3px",
    backgroundColor:"#ffffff"

  }
})
export default function Home() {
  const [textSearch, onChangeText] = React.useState("");

  return (
    <View>
      <Icon name="search" />
      <TextInput
        style={styles.boxSearch}
        onChangeText={text => onChangeText(text)}
        value={textSearch}
        placeholder="Gõ từ để tra từ điển"
      />
    </View>
  );
}
