import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Item, Input, Card, CardItem, Text, Body } from "native-base"


export default function Home() {
  const [textSearch, onChangeText] = React.useState("");
  return (
    <View>
      <Text style={styles.styleTranslate}>Từ điển tra cứu </Text>
      <View style={styles.boxTranslate}>
      <Text style={styles.styleTitle}>
          {"Tiếng Anh"}
        </Text>
        <Icon name="swap" />
        <Text style={styles.styleTitle}>
          {"Tiếng Việt"}
        </Text>
      </View>
      <View style={styles.viewBoxSearch}>
        <Item rounded style={styles.boxSearch}>
          <Icon name="search" />
          <Input
            onChangeText={text => onChangeText(text)}
            value={textSearch}
            placeholder="Gõ từ để tra từ điển" />
        </Item>
        <Icon name="mic" style={styles.styleIcon} />
      </View>
      <View>
        <Card>
          <CardItem header style={styles.cardItem}>
            <Text style={styles.word}>face</Text>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Body >
              <View style={styles.boxTypeWord}>
                <Text style={styles.typeWord}>
                  danh từ
                  </Text>
                <Icon name="megaphone"/>
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
    </View>
  );
}
const styles = StyleSheet.create({
  styleTranslate: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",

  },
  styleTitle: {
    borderColor: "#000000",
    padding: 5,
    fontSize: 16,
  },
  boxTranslate: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20
  },
  viewBoxSearch: {
    flexDirection: 'row',
    backgroundColor: "#3385ff",

    height: 60,
    alignItems: "center",

  },
  boxSearch: {
    height: 40,
    borderColor: '#3385ff',
    borderRadius: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    width: 320,

  },
  styleIcon: {
    marginHorizontal: 10,
    color: "#ffffff"
  },
  cardItem: {
    backgroundColor: "#66a3ff"
  },
  word: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight:"300"
  },
  meaning: {
    color: "#ffffff"
  },
  boxTypeWord:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width:300,
    marginEnd:10
  },
  typeWord: {
    color: "#000000",
    fontWeight: "bold",
  }
})