import React from "react";
import { View, StyleSheet } from "react-native"
import { Icon, Card, CardItem, Text, Body } from "native-base"

export default function CardWord() {
  return (
    <View >
      <Card style={styles.round}>
        <CardItem header style={styles.cardWord}>
          <Text style={styles.word}>face</Text>
        </CardItem>
        <CardItem style={styles.cardWord}>
          <Body >
            <View style={styles.boxTypeWord}>
              <Text style={styles.typeWord}>
                danh từ
                  </Text>
              <Icon name="megaphone" />
            </View>
            <View >
              <Text style={styles.meaning}>
                phần phía trước của đầu, từ trán đến cằm, mặt
                  </Text>
            </View>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  round:{
    borderRadius:30,
    elevation: 3,
    backgroundColor: "#66a3ff",
    
    marginLeft : 20,
    marginRight:20
  },
  cardWord: {
    borderRadius: 30,
    backgroundColor: "#66a3ff"
  },
  word: {
    fontSize: 40,
   height:50,
    color: "#ffffff",
    fontWeight: "bold"
  },
  meaning: {
    color: "#ffffff"
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