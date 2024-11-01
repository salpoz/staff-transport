import { StyleSheet, Text, View } from "react-native";

const Stop = ({ name }) => {
  return (
    <View style={styles.outerLayer}>
      <Text style={styles.nameTxt}>{name}</Text>
    </View>
  );
};

export default Stop;

const styles = StyleSheet.create({
  outerLayer: {
    // flex: 1,

    alignItems: "center",
  },
  nameTxt: {
    // textAlign: "center",
    fontSize: 16,
  },
});
