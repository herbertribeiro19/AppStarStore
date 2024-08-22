import React from "react";
import AppNavigator from "./src/constants/AppNavigator";
import {
  StyleSheet
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
});

