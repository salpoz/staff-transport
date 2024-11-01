import { View, StyleSheet, Pressable } from "react-native";
import Heading from "./Heading";
import { Colors } from "../constants/colors";
import Card from "./ui/Card";
import TimesContainer from "./TimesContainer";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";

const DetailTimeCard = ({ routeDetails }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  function onPressHandler() {
    navigation.navigate("schedule", {
      routeDetails,
    });
  }

  return (
    <Card>
      <Pressable
        onPress={onPressHandler}
        style={({ pressed }) => pressed && styles.pressed}
        android_ripple={{ color: Colors.primary100, borderless: false }}
      >
        <View style={[styles.container, { width: (width * 85) / 100 }]}>
          <Heading
            title={routeDetails.name}
            color={routeDetails.color || Colors.primary300}
          />
          <TimesContainer routeDetails={routeDetails} />
        </View>
      </Pressable>
    </Card>
  );
};

export default DetailTimeCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  pressed: {
    opacity: 0.5,
  },
});
