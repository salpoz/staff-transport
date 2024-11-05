import {
  FlatList,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import DetailTimeCard from "../components/DetailTimeCard";
import { useContext, useState } from "react";
import { ScheduleContext } from "../store/schedule-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AllBusRoutesScreen = () => {
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

  if (scheduleCtx.loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (scheduleCtx.error.status || error) {
    return (
      <View>
        <Text>{scheduleCtx.error?.message}</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={scheduleCtx.busSchedule}
        renderItem={renderCard}
        keyExtractor={(item) => item.name}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
        }
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
};

export default AllBusRoutesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 100,
  },
});
