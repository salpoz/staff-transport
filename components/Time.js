import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import Note from "./Note";

const Time = ({ time, note }) => {
  return (
    <View style={styles.timeBoxStyle}>
      <Text style={styles.txtStyle}>{time}</Text>
      {note && <Note note={note} />}
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  timeBoxStyle: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary200,
  },
  txtStyle: {
    fontSize: 42,
    color: Colors.primary400,
    textAlign: "center",
  },
});
