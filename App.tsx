import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Home from "./Views/Home";
import Search from "./Views/Search";
import { TraveDark, TraveLight } from "./themes";

const Tab = createBottomTabNavigator();

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
                    return (
                      <Ionicons name="copy" size={24} color={color} />
                    );
                  },
                }}
                name="Home"
                component={Home}
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({ color }) => {
                    return (
                      <Ionicons name="ios-search" size={24} color={color} />
                    );
                  },
                }}
                name="NotHome"
                component={Search}
              />
            </Tab.Navigator>
            <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
          </ThemeProvider>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
