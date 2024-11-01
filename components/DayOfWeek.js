import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/colors";

const DayOfWeek = ({ day, handlePress, selectedDay, next }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function pressHandler() {
    handlePress(day);
  }

  const today = new Date();

  return (
    <Pressable style={styles.pressableStyle} onPress={pressHandler}>
      <View
        style={[
          styles.container,
          selectedDay === day && {
            backgroundColor: Colors.background100,
            borderBottomWidth: 2,
            borderBottomColor: Colors.primary400,
          },
        ]}
      >
        <Text
          style={[
            styles.txtStyle,
            day === today.getDay() && { color: Colors.accent500 },
          ]}
        >
          {days[day]}
        </Text>
      </View>
    </Pressable>
  );
};

export default DayOfWeek;

const styles = StyleSheet.create({
  pressableStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    // marginLeft: 5,
    marginHorizontal: 2,
    marginVertical: 2,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary150,
  },

  txtStyle: {
    fontSize: 12,
    padding: 15,
    color: Colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.5,
  },
});
