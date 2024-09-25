import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ScheduleContext = createContext({
  busSchedule: {},
  ferrySchedule: {},
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
        setBusTimes(response.data.bus);
        setFerryTimes(response.data.ferry);
      } catch (err) {
        setError({ status: true, message: { err } });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const value = {
    busSchedule: busTimes,
    ferrySchedule: ferryTimes,
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
