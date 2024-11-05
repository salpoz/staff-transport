import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../constants/colors";
import AllBusRoutesScreen from "./AllBusRoutesScreen";
import AllFerryRoutesScreen from "./AllFerryRoutesScreen";
import { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const [date, setDate] = useState(new Date());
  function DayInfo() {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.day}>
          {date.toLocaleDateString("en-US", { weekday: "long" })}
        </Text>
        <Text style={styles.month}>
          {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </Text>
      </View>
    );
  }

  function test() {
    return <Text style={{ color: "white" }}>Testing</Text>;
  }

  useEffect(() => {
    const updateTime = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(updateTime);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.primary600,
          borderTopWidth: 2,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 100,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },

        headerRight: DayInfo,

        headerLeftContainerStyle: {
          position: "absolute",
          left: "40%",
          // borderWidth: 2,
          // borderColor: "white",
          transform: [{ translateY: 5 }],
        },
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: Colors.primary600,
          height: 120,
        },
        headerTitleContainerStyle: {
          // borderWidth: 2,
          // borderColor: "red",
        },
        headerTitleStyle: {
          color: Colors.primary100,
          fontFamily: "PrimaryTitleFont",
          marginHorizontal: 10,
          fontSize: 48,
        },
        tabBarActiveTintColor: Colors.primary150,
        tabBarInactiveTintColor: Colors.primary400,
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
          tabBarLabel: "Bus",
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
          tabBarLabel: "Ferry",
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
  infoContainer: {
    marginRight: 15,
    marginTop: 10,
  },
  day: {
    fontFamily: "SecondaryTitleFont",
    fontSize: 22,
    textAlign: "right",

    color: Colors.primary100,
  },
  month: {
    fontSize: 16,
    textAlign: "right",
    color: Colors.primary100,
  },
});
