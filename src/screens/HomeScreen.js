import React from 'react';
import { StyleSheet, View , Button} from 'react-native';
import { Text } from "native-base"
import BoxSearch from "../components/BoxSearch"
import BoxSwitchLanguage from "../components/BoxSwitchLanguage"
import ListrecentWords from "../components/ListrecentWords"

export default function HomeScreen(props) {
  return (
    <View>
      
      <BoxSearch/>
      <BoxSwitchLanguage/>
      
      <ListrecentWords/>
    </View>
  );
}
const styles = StyleSheet.create({
  styleTitle: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  }
})