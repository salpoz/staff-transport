import { View, Text, StyleSheet } from "react-native";

import Counter from "./Counter";

const TimeWithCounter = ({ time, color, label, counterStr }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <Text style={[styles.timeDisplay, { color: color }]}>{time}</Text>
      <Counter counterStr={counterStr} />
    </View>
  );
};

export default TimeWithCounter;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeDisplay: {
    fontSize: 42,
    fontWeight: "500",
    letterSpacing: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    letterSpacing: 5,
    textAlign: "center",
  },
});
