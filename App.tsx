import React from "react";
import AppNavigator from "./src/constants/AppNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
enableScreens();

const Stack = createStackNavigator();

// Chamando a minha constante do AppNavigator, que está carregando a navegação e rotas
export default function App() {
  return <AppNavigator />;
}


