import { View, Text, StyleSheet } from "react-native";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    // padding: 30,
    // paddingBottom: 30,
    borderRadius: 10,
    //for iOS
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
    // Border properties
    borderWidth: 1,
    borderColor: "#dddddd",
    margin: 10,
  },
});
