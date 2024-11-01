import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

const Heading = ({ title, color }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color || Colors.primary300 },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
