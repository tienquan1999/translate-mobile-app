import React from "react";
import { View, StyleSheet } from "react-native"
import { Icon, Card, CardItem, Text, Body } from "native-base"

export default function CardWord() {
  return (
    <View>
      <Card>
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
  cardWord: {
    backgroundColor: "#66a3ff"
  },
  word: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "300"
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