import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import {
  extractTimesFromDay,
  getNextAndPreviousTime,
  getNotes,
} from "../utils/helper";
import Time from "../components/Time";
import { Dimensions } from "react-native";
import Stop from "../components/Stop";
import DayOfWeek from "../components/DayOfWeek";

const FullScheduleScreen = () => {
  const [selectedDay, setSelectedDay] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const { routeDetails } = route.params;
  const { nextTime } = getNextAndPreviousTime(routeDetails);
  const [times, setTimes] = useState(
    extractTimesFromDay(new Date(nextTime).getDay(), routeDetails.times)
  );
  const [notes, setNotes] = useState(getInitialNotes);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const timeNext = new Date(nextTime);

  const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];

  const stops = routeDetails.stops?.split(",");

  fadeAnim.setValue(0);
  Animated.timing(fadeAnim, {
    easing: Easing.linear,
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: routeDetails.name,
      headerStyle: { backgroundColor: routeDetails.color },
    });

    setSelectedDay(timeNext.getDay());
  }, []);

  function handlePress(day) {
    setSelectedDay(day);
    const times = extractTimesFromDay(day, routeDetails.times);
    setTimes(times);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      easing: Easing.linear,
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  function getInitialNotes() {
    const allNotes = getNotes(routeDetails);
    const todaysNotes = allNotes.filter((note) =>
      note.days.includes(new Date().getDay())
    );

    return todaysNotes;
  }

  function renderTime(item) {
    let note;
    notes.forEach((n) => {
      if (n.times.includes(item.item)) {
        note = n.msg;
      }
    });

    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <Time time={item.item} note={note} />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.weekdaysContainer}>
        {daysOfWeek.map((d) => (
          <DayOfWeek
            selectedDay={selectedDay}
            day={d}
            key={d}
            handlePress={handlePress}
          />
        ))}
      </View>
      <View style={[styles.infoContainer, !stops && { marginHorizontal: 30 }]}>
        {stops && (
          <ScrollView style={styles.stopsContainer}>
            {stops?.map((stop, index) => {
              const isLastItem = index === stops.length - 1;
              return (
                <View style={styles.stopsStyle} key={index}>
                  <Stop name={stop} />
                  {!isLastItem && (
                    <Ionicons
                      style={{ marginVertical: 10 }}
                      name="arrow-down"
                      size={24}
                      color={routeDetails.color}
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>
        )}

        <View style={styles.timesContainer}>
          <FlatList
            data={times}
            keyExtractor={(item, index) => index}
            renderItem={renderTime}
            ListEmptyComponent={() => (
              <View style={styles.emptyList}>
                <Text style={styles.emptyListTxt}>
                  Sorry, there are no scheduled times for this day.
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default FullScheduleScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    flexDirection: "column",
  },
  weekdaysContainer: {
    flexDirection: "row",
    margin: 8,
    height: 60,
    paddingBottom: 5,
  },
  infoContainer: {
    flexDirection: "row",
  },
  stopsContainer: {
    flex: 1.2,
    height: Dimensions.get("window").height * 0.7,
    paddingBottom: 30,
    marginTop: 15,
  },
  timesContainer: {
    flex: 2,
    marginHorizontal: 15,
    paddingBottom: 15,
    marginBottom: 100,
  },
  stopsStyle: {
    alignItems: "center",
  },
  emptyList: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListTxt: {
    fontSize: 16,
  },
});
