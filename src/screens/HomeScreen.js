import React from 'react';
import { View } from 'react-native';
import BoxSwitchLanguage from "../components/BoxSwitchLanguage"
import ListrecentWords from "../components/ListrecentWords"

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <BoxSwitchLanguage nav={navigation}/>
      <ListrecentWords navigation={navigation} />
    </View>
  );
}
