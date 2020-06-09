import React from "react";
import DetailWord from "../components/DetailWord";
import {Text} from "react-native"

export default function DefinitionScreen({ navigation, route }) {
  
  const data = route.params.wordMeaning;

  return (
    // <DetailWord navigation={navigation} route={route} />
    <Text>
      {route.params.wordMeaning}
    </Text>
  )
}
