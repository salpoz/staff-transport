import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BusScreen from "./screens/BusScreen";
import FerryScreen from "./screens/FerryScreen";
import { Colors } from "./constants/GlobalStyles";
import ScheduleContextProvider from "./store/schedule-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <ScheduleContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500, height: 100 },
            headerTitleStyle: { color: "white", fontSize: 22 },
            headerBackTitleVisible: false,
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="busScreen"
            component={BusScreen}
            options={{ headerShown: true, headerTitle: "Bus Times" }}
          />
          <Stack.Screen name="ferryScreen" component={FerryScreen} />
        </Stack.Navigator>
      </ScheduleContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
