import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/GlobalStyles";

const Route = () => {
  return (
    <View style={styles.container}>
      <Text>Route</Text>
    </View>
  );
};

export default Route;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "90%",
    borderWidth: 2,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
