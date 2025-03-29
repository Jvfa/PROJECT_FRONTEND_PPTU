import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter  } from "expo-router";

const SideMenu = ({ isOpen, isMobile, toggleMenu }) => {

    const router = useRouter();

    return (
        <View style={[styles.menu, isMobile && !isOpen ? styles.menuClosed : styles.menuOpen]}>
            {/* Logo */}
            <Image source={require("../../assets/images/icon-removebg-preview.png")} style={styles.logo} />

            {/* Botão de fechar apenas no mobile */}
            {isMobile && isOpen && (
                <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                    <Ionicons name="close" size={30} color="black" />
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/dashboard")} >
                <Ionicons name="speedometer" size={24} color="black" />
                <Text style={styles.menuText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/addProduct")}>
                <Ionicons name="shirt" size={24} color="black" />
                <Text style={styles.menuText}>Produtos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 250,
        height: "100%",
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingLeft: 20,
        zIndex: 10,
        transition: "transform 0.3s ease-in-out",
    },
    menuOpen: {
        transform: [{ translateX: 0 }],
    },
    menuClosed: {
        transform: [{ translateX: -250 }],
    },
    logo: {
        width: 150,
        height: 90,
        resizeMode: "contain",
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
    },
    menuText: {
        color: "black",
        fontSize: 18,
        marginLeft: 10,
        fontWeight: "bold",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
});

export default SideMenu;
