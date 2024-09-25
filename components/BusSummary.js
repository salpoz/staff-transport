import { useContext } from "react";
import { View, Text } from "react-native";
import { ScheduleContext } from "../store/schedule-context";

const BusSummary = () => {
  const scheduleCtx = useContext(ScheduleContext);
  const routes = Object.keys(scheduleCtx.busSchedule);

  return (
    <View>
      <Text>BusSummary</Text>
    </View>
  );
};

export default BusSummary;
