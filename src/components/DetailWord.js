import React from "react";
import { View,StyleSheet, Image, ScrollView} from "react-native";
import { Text} from "native-base";

export default function DetailWord(props) {
  
  const word = props.route.params.word
  const propering = props.route.params.proper
  const meaning = props.route.params.mean

  return (

    <View style={styles.body}>
      <ScrollView>
        <Text style={styles.wordheader}>{word}</Text>
        <View>
          <Image style={styles.image} source={require('../icon/listen.png')} />
        </View>
        <View>
          <Text style={styles.proper}>{propering}</Text>
          <Text style={styles.means}>{meaning}</Text>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    height: "100%"
  },
  wordheader: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000077",
    paddingTop: 30,
  },
  image: {
    height: 20,
    width: 20,
    marginTop: 20,
  },
  proper: {
    color: "#3366FF",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 20,
  },
  means: {
    marginTop: 20,
    color: "#000077"
  },
})
