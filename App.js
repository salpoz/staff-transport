import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "./constants/colors";
import ScheduleContextProvider from "./store/schedule-context";
import FullScheduleScreen from "./screens/FullScheduleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <ScheduleContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500, height: 50 },
            headerTitleAlign: "center",
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
            name="schedule"
            component={FullScheduleScreen}
            options={{ headerShown: true }}
          />
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
