import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "./constants/colors";
import ScheduleContextProvider from "./store/schedule-context";
import FullScheduleScreen from "./screens/FullScheduleScreen";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect, useState, useCallback } from "react";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function StackNavigator() {
  return (
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
  );
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          PrimaryTitleFont: require("./assets/fonts/DancingScript-VariableFont_wght.ttf"),
          SecondaryTitleFont: require("./assets/fonts/ArchivoNarrow-VariableFont_wght.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <ScheduleContextProvider>
        <View style={styles.outerViewContainer} onLayout={onLayoutRootView}>
          <StackNavigator />
        </View>
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
  outerViewContainer: {
    flex: 1,
  },
});
