import React from "react";
import { useColorScheme, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Home from "./Views/Home";
import SearchOptions from "./Views/SearchOptions";
import { TraveDark, TraveLight } from "./themes";
import SearchResults from "./Views/SearchResults";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SearchNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="SearchOptions" component={SearchOptions} />
    <Stack.Screen name="SearchResults" component={SearchResults} />
  </Stack.Navigator>
);

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? TraveDark : TraveLight;
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <ThemeProvider theme={theme}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
            }}
          >
            <Tab.Screen
              options={{
                tabBarIcon: ({ color }) => {
                  return <Ionicons name="copy" size={24} color={color} />;
                },
              }}
              name="Home"
              component={Home}
            />
            <Tab.Screen
              options={{
                tabBarIcon: ({ color }) => {
                  return <Ionicons name="ios-search" size={24} color={color} />;
                },
              }}
              name="Search"
              component={SearchNavigator}
            />
          </Tab.Navigator>
          <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
