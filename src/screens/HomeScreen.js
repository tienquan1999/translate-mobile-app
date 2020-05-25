import React from 'react';
import { StyleSheet, View , Button} from 'react-native';
import { Text } from "native-base"
import BoxSearch from "../components/BoxSearch"
import BoxSwitchLanguage from "../components/BoxSwitchLanguage"
import ListrecentWords from "../components/ListrecentWords"

export default function HomeScreen({navigation}) {
  return (
    <View>
      <BoxSwitchLanguage/>
      <ListrecentWords navigation={navigation}/>
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