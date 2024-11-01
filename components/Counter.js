import { Text, StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";

const Counter = ({ counterStr }) => {
  return (
    <View>
      <Text style={styles.timeCounter}>{counterStr}</Text>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  timeCounter: {
    textAlign: "center",
    color: Colors.primary300,
    padding: 3,
  },
});
