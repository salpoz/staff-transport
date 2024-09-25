import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import BusSummary from "../components/BusSummary";
import FerrySummary from "../components/FerrySummary";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../constants/GlobalStyles";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.primary500, height: 100 },
        tabBarLabelStyle: { fontSize: 16 },
        headerStyle: { backgroundColor: Colors.primary500, height: 100 },
        headerTitleStyle: { color: "white", fontSize: 22 },
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="bus"
        component={BusSummary}
        options={{
          title: "Bus Routes",
          // tabBarLabel: "Bus",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="bus-outline" size={24} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="ferry"
        component={FerrySummary}
        options={{
          title: "Ferry Routes",
          // tabBarLabel: "Ferry",

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
