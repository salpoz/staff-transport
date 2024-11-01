import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

const Note = ({ note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.txt}>*{note}</Text>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  line: {
    marginVertical: 5,
    height: 1,
    width: "70%",
    backgroundColor: Colors.primary150,
  },
  txt: {
    color: Colors.primary300,
    fontSize: Dimensions.get("screen").width > 380 ? 12 : 10,
    textAlign: "center",
  },
});
