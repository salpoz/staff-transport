import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScheduleContext } from "../store/schedule-context";
import DetailTimeCard from "../components/DetailTimeCard";

const AllFerryRoutesScreen = () => {
  const scheduleCtx = useContext(ScheduleContext);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();

  function renderCard({ item }) {
    return <DetailTimeCard routeDetails={item} />;
  }

  async function refreshHandler() {
    try {
      setRefreshing(true);
      const response = await axios.get(process.env.API_URL);
      const busData = [];
      for (let key in response.data.bus) {
        busData.push(response.data.bus[key]);
      }
      scheduleCtx.setBusTimes(busData);
      await AsyncStorage.setItem("bus", JSON.stringify(busData));

      const ferryData = [];
      for (let key in response.data.ferry) {
        ferryData.push(response.data.ferry[key]);
      }
      scheduleCtx.setFerryTimes(ferryData);
      AsyncStorage.setItem("ferry", JSON.stringify(ferryData));

      setRefreshing(false);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={scheduleCtx.ferrySchedule}
        renderItem={renderCard}
        keyExtractor={(item) => item.name}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
        }
      />
    </View>
  );
};

export default AllFerryRoutesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
});
