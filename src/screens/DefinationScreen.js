import React from "react";
import { View, Text } from "react-native"

export default function DefinationScreen(props) {
  const word = props.navigation.getParam('word', 'NO-ID');
  const meaning = props.navigation.getParam('mean', 'some default value');

  return (
    <View>
      <Text>{word}</Text>
      <Text>{meaning}</Text>
    </View>)
}