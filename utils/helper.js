// Returns an object containing next and previous time as a Date object.
function getNextAndPreviousTime(routeDetails) {
  let weekday = new Date();
  const today = new Date();
  let found = false;
  let days = 0;
  let nextTime, prevTime;

  do {
    // get the list of times for the given weekday
    weekday.setDate(weekday.getDate() + days);
    let timesArray = extractTimesFromDay(weekday.getDay(), routeDetails.times);

    // find the index of the next time from the times array
    const nextTimeIndex = timesArray.findIndex(
      (time) =>
        new Date(
          `${today.getFullYear()}-${today.getMonth() + 1}-${
            today.getDate() + days
          }T${time}:00`
        ).getTime() > today.getTime()
    );

    // if index of the next time is greater than zero, then index of previous time is next time minus 1
    if (nextTimeIndex > 0) {
      nextTime = new Date(
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T${
          timesArray[nextTimeIndex]
        }:00`
      );
      prevTime = new Date(
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T${
          timesArray[nextTimeIndex - 1]
        }:00`
      );
      return {
        prevTime,
        nextTime,
      };
    }

    // if next time index is zero, previous time is the last index of previous day
    else if (nextTimeIndex === 0) {
      nextTime = new Date(
        `${today.getFullYear()}-${today.getMonth() + 1}-${
          today.getDate() + days
        }T${timesArray[nextTimeIndex]}:00`
      );

      if (nextTime.getDate() - 1 === today.getDate()) {
        timesArray = extractTimesFromDay(today.getDay(), routeDetails.times);
        if (timesArray.length === 0) {
          today.setDate(today.getDate() - (days + 1));
          timesArray = extractTimesFromDay(today.getDay(), routeDetails.times);
        }
        prevTime = new Date(
          `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T${
            timesArray[timesArray.length - 1]
          }:00`
        );
      } else {
        const tempDay = new Date(today);

        tempDay.setDate(nextTime.getDate() - (days + 1));
        timesArray = extractTimesFromDay(tempDay.getDay(), routeDetails.times);

        prevTime = new Date(
          `${tempDay.getFullYear()}-${
            tempDay.getMonth() + 1
          }-${tempDay.getDate()}T${timesArray[timesArray.length - 1]}:00`
        );
      }

      return {
        prevTime,
        nextTime,
      };
    }
    days++;
    if (days > 6) {
      return {
        prevTime: "--:--",
        nextTime: "--:--",
      };
    }
  } while (!found);
}

// return an array of times from the given times object for the given weekday
function extractTimesFromDay(day, timesObj) {
  if (timesObj === undefined) {
    return undefined;
  }
  const timesArr = [];
  for (let key in timesObj) {
    if (timesObj[key].days.includes(day)) {
      timesArr.push(key.padStart(5, "0"));
    }
  }
  return timesArr.sort();
}

function getCounterString(startTime, endTime) {
  let str = "";
  if (isNaN(startTime) || isNaN(endTime)) {
    return {
      update: false,
      str: "unavailable",
    };
  }

  const diff = endTime - startTime;
  const differenceInMs = Math.abs(diff);

  const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

  if (hours === 0 && minutes === 0 && seconds === 0) {
    return {
      str: "--",
      update: true, // created this to update time, but it is not being used now
    };
  }

  if (hours === 0 && minutes === 0) {
    str = `${seconds}sec`;
  } else if (hours === 0) {
    str = `${minutes}min ${seconds}sec`;
  } else {
    str = `${hours}hr ${minutes}min`;
  }

  return {
    update: false,
    str: str,
  };
}

function getNotes(routeDetails) {
  const notes = [];
  if (routeDetails.notes) {
    for (key in routeDetails.notes) {
      notes.push(routeDetails.notes[key]);
    }
  }
  return notes;
}

export {
  getNextAndPreviousTime,
  extractTimesFromDay,
  getCounterString,
  getNotes,
};
