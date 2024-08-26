import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export default function Header() {
  const navigation = useNavigation();

  //Header que estará em todas as telas da aplicação.
  return (
    <View style={styles.headerContainer}>
      <View style={styles.contentHeader}>
        <Image
          style={styles.logo}
          source={require("../../img/logo.png")}
        />
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart" size={26} color="#f8f8f8" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: "18%",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: statusBarHeight + 3,
    alignItems: "center",
    marginRight: 24,
    marginLeft: 24,
    width: "90%",
  },
  logo: {
    width: 84,
    height: 32,
  },
  btn: {
    backgroundColor: "#232327",
    padding: 12,
    borderRadius: 50,
  },
});
