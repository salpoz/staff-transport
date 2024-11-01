import { View, Text, StyleSheet } from "react-native";
import TimeWithCounter from "./TimeWithCounter";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import {
  getCounterString,
  getNextAndPreviousTime,
  getNotes,
} from "../utils/helper";
import Note from "./Note";

const TimesContainer = ({ routeDetails }) => {
  const [nextTime, setNextTime] = useState();
  const [prevTime, setPrevTime] = useState();
  const [nextCounter, setNextCounter] = useState();
  const [prevCounter, setPrevCounter] = useState();
  const [nextNotes, setNextNotes] = useState([]);
  const [prevNotes, setPrevNotes] = useState([]);

  function updateTimes() {
    const { nextTime: n, prevTime: p } = getNextAndPreviousTime(routeDetails);

    setNextTime(
      new Date(n)
        .toLocaleTimeString("en-US", { hour12: false })
        .slice(0, 5)
        .padStart(5, "0")
    );
    setPrevTime(
      new Date(p)
        .toLocaleTimeString("en-US", { hour12: false })
        .slice(0, 5)
        .padStart(5, "0")
    );
  }

  useEffect(() => {
    const notes = getNotes(routeDetails);
    notes.forEach((note) => {
      if (
        note?.times.includes(nextTime) &&
        note?.days.includes(new Date().getDay())
      ) {
        setNextNotes((curr) => [note?.msg]);
      }

      if (
        note?.times.includes(prevTime) &&
        note?.days.includes(new Date().getDay())
      ) {
        setPrevNotes((curr) => [note?.msg]);
      }
    });

    const intervalId = setInterval(() => {
      const { nextTime: n, prevTime: p } = getNextAndPreviousTime(routeDetails);

      updateTimes();
      const nextCtr = getCounterString(new Date(n).getTime(), Date.now());
      setNextCounter(nextCtr.str);
      const prevCtr = getCounterString(new Date(p).getTime(), Date.now());
      setPrevCounter(prevCtr.str);
    }, 1000);

    return () => {
      intervalId;
    };
  }, []);

  return (
    <View style={styles.timeContainer}>
      <View style={styles.content}>
        <TimeWithCounter
          time={nextTime}
          color={Colors.accent500}
          label="Next"
          counterStr={nextCounter}
        />
        {nextNotes.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </View>
      <View style={styles.content}>
        <TimeWithCounter
          time={prevTime}
          color={Colors.primary300}
          label="Previous"
          counterStr={prevCounter}
        />
        {prevNotes.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </View>
    </View>
  );
};

export default TimesContainer;

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  content: {
    flex: 1,
  },
});
