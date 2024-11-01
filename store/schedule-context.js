import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const ScheduleContext = createContext({
  busSchedule: [],
  ferrySchedule: [],
  setBusTimes: () => {},
  setFerryTimes: () => {},
  loading: true,
  error: { status: false, message: "" },
});

function ScheduleContextProvider({ children }) {
  const [busTimes, setBusTimes] = useState([]);
  const [ferryTimes, setFerryTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(process.env.API_URL);
        const busData = [];
        for (let key in response.data.bus) {
          busData.push(response.data.bus[key]);
        }
        setBusTimes(busData);
        AsyncStorage.setItem("bus", JSON.stringify(busData));

        const ferryData = [];
        for (let key in response.data.ferry) {
          ferryData.push(response.data.ferry[key]);
        }
        setFerryTimes(ferryData);
        AsyncStorage.setItem("ferry", JSON.stringify(ferryData));
      } catch (err) {
        setError({ status: true, message: { err } });
      } finally {
        setLoading(false);
      }
    }

    async function getLocalData() {
      const rawBusData = await AsyncStorage.getItem("bus");
      const rawFerryData = await AsyncStorage.getItem("ferry");
      const busData = JSON.parse(rawBusData);
      const ferryData = JSON.parse(rawFerryData);

      return {
        busData,
        ferryData,
      };
    }
    const { busData, ferryData } = getLocalData();

    if (busData === undefined && ferryData === undefined) {
      fetchData();
    } else {
      setBusTimes(busData);
      setFerryTimes(ferryData);
    }
  }, []);

  const value = {
    busSchedule: busTimes,
    ferrySchedule: ferryTimes,
    setBusTimes,
    setFerryTimes,
    loading: loading,
    error: error,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
}

export default ScheduleContextProvider;
