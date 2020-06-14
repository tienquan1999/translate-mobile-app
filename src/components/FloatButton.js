import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"

export default function FloatButton() {
  return (
    <View style={styles.MainContainer}>
      <TouchableOpacity
        style={styles.TouchableOpacityStyleLove}>
        <Icon name="search1" size={30} backgroundColor="#0007cc"/>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#ffffff',
  },
  TouchableOpacityStyleLove: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 50,
    bottom: 30,
  },
})

