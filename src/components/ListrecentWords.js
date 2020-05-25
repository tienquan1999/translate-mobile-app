import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CardWord from "./CardWord"

export default function ListrecentWords(props) {
  const [recentWords, setrecentWords] = useState(
    [{ word: "face", proper: "danh tu", mean: "khuôn mặt ", key: "1" },
    { word: "cat", proper: "danh tu", mean: "mèo", key: "2" },
    { word: "dog", proper: "danh tu", mean: "chó", key: "3" },
    { word: "book", proper: "danh tu", mean: "sách", key: "4" },
    { word: "house", proper: "danh tu", mean: "nhà", key: "5" },
    { word: "sky", proper: "danh tu", mean: "bầu trời", key: "6" }
    ]
  );
  return (
    <View style={styles.list}>
      <FlatList
        data={recentWords}
        renderItem={({ item }) => (
          <CardWord item={item} />

        )}
      />
    </View>

  )
}
const styles = StyleSheet.create({
  list: {
  }
})
