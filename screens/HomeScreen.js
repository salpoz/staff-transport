import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../constants/colors";
import AllBusRoutesScreen from "./AllBusRoutesScreen";
import AllFerryRoutesScreen from "./AllFerryRoutesScreen";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.primary600,
        },
        tabBarLabelStyle: { fontSize: 16 },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.primary600,
          height: 90,
        },
        headerTitleStyle: { color: Colors.primary100, fontSize: 22 },
        tabBarActiveTintColor: Colors.primary100,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="bus"
        component={AllBusRoutesScreen}
        options={{
          title: "Bus",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="bus-outline" size={24} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="ferry"
        component={AllFerryRoutesScreen}
        options={{
          title: "Ferry",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="boat-outline" color={color} size={24} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
});
