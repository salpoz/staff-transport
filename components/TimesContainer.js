import { View, StyleSheet } from "react-native";
import TimeWithCounter from "./TimeWithCounter";
import { Colors } from "../constants/colors";
import { useEffect, useLayoutEffect, useState } from "react";
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

  function updateNotes() {
    const notes = getNotes(routeDetails);
    const { nextTime, prevTime } = getNextAndPreviousTime(routeDetails);

    notes.forEach((note) => {
      if (
        note?.times.includes(
          new Date(nextTime)
            .toLocaleTimeString("en-US", { hour12: false })
            .slice(0, 5)
            .padStart(5, "0")
        ) &&
        note?.days.includes(new Date(nextTime).getDay())
      ) {
        setNextNotes((curr) => [note?.msg]);
      }
      if (
        note?.times.includes(
          new Date(prevTime)
            .toLocaleTimeString("en-US", { hour12: false })
            .slice(0, 5)
            .padStart(5, "0")
        ) &&
        note?.days.includes(new Date(prevTime).getDay())
      ) {
        setPrevNotes((curr) => [note?.msg]);
      }
    });
  }

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
    updateNotes();
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
  }, [routeDetails]);

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
