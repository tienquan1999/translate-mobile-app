import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from "native-base"
import BoxSearch from "../components/BoxSearch"
import BoxSwitchLanguage from "../components/BoxSwitchLanguage"
import CardWord from  "../components/CardWord"
import PickerLanguge from '../components/PickerLanguage';

export default function HomeScreen() {
  return (
    <View>
      {/* <Text style={styles.styleTitle}>Từ điển tra cứu </Text> */}
      <BoxSearch/>
      <BoxSwitchLanguage/>
      
      <CardWord/>
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