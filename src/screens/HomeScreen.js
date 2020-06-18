import React from 'react';
import { View } from 'react-native';
import BoxSwitchLanguage from "../components/BoxSwitchLanguage"
import ListRecentWords from "../components/ListRecentWords"

export default function HomeScreen(props) {
  console.log("props in home: ", props)
  const {navigation, route} = props;
  return (
    <View>
      <BoxSwitchLanguage nav={navigation}/>
      <ListRecentWords navigation={navigation} route={route}/>
    </View>
  );
}
