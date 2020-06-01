import React from "react";

import { View, StyleSheet, Image , TouchableOpacity} from "react-native"
import { Card, CardItem, Text, Body } from "native-base"

export default function CardWord(props) {
  const item = props.item;

  return (
    <TouchableOpacity onPress={()=> props.nav.navigate('Word', {word: item.word,proper: item.proper, mean: item.mean})}>
      <Card style={styles.round}>
        <CardItem header style={styles.cardWord}>
          <Text style={styles.word}>{item.word}</Text>
        </CardItem>
        <CardItem style={styles.cardWord}>
          <Body >
            <View style={styles.boxTypeWord}>
              <Text style={styles.typeWord}>
                {item.proper}
              </Text>
              <Image  style={styles.images} source={require('../icon/listen.png')}/>
            </View>
            <View >
              <Text style={styles.meaning}>
                {item.mean}
              </Text>
            </View>
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  images:{
    width:20,
    height:20
  },
  round: {
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#0088cc",

    marginLeft: 20,
    marginRight: 20
  },
  cardWord: {
    borderRadius: 15,
    backgroundColor: "#0088cc",
    height: 70,
    
  },
  word: {
    fontSize: 40,
    height: 50,
    color: "#ffffff",
    fontWeight: "bold"
  },
  meaning: {
    color: "#ffffff",
    height:25
  },
  boxTypeWord: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    marginEnd: 10
  },
  typeWord: {
    color: "#000000",
    fontWeight: "bold",
  }
})