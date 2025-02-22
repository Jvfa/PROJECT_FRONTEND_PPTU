import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Navbar = ({ onNovidadesPress }) => {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <View style={styles.logo}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/SmoothB.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Botão Home */}
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/")}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      {/* Botão Novidades com rolagem */}
      <TouchableOpacity style={styles.navItem} onPress={onNovidadesPress}>
        <Ionicons name="megaphone-outline" size={24} color="black" />
        <Text style={styles.text}>Novidades</Text>
      </TouchableOpacity>

      {/* Botão Informações */}
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/Information")}>
        <Ionicons name="information-circle-outline" size={24} color="black" />
        <Text style={styles.text}>Informações</Text>
      </TouchableOpacity>

      {/* Botão Login */}
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/login")}>
        <Ionicons name="person-outline" size={24} color="black" />
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: "center",
    padding: 10,
  },
  logo: {
    width: 120,
    height: 50,
  },
  text: {
    fontSize: 12,
    color: "black",
    marginTop: 4,
  },
});

export default Navbar;
