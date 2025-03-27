import React, { useState } from "react";
import { 
    View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "../components/SideMenu";

const screenWidth = Dimensions.get("window").width;
const isMobile = screenWidth < 768;

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Cores frias para os gráficos
    const coldColors = [
        'rgba(63, 81, 181, 1)',    // Azul profundo
        'rgba(103, 58, 183, 1)',   // Roxo
        'rgba(171, 71, 188, 1)',   // Roxo rosa
        'rgba(233, 30, 99, 1)',    // Rosa escuro
        'rgba(3, 169, 244, 1)'     // Azul claro
    ];

    const vendasMensais = {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [{ data: [500, 700, 800, 650, 900, 1200] }],
    };

    const vendasCategorias = [
        {
            name: "Roupas",
            population: 40,
            color: coldColors[1],
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Acessórios",
            population: 25,
            color: coldColors[2],
            legendFontColor: "#000",
            legendFontSize: 12
        },
        {
            name: "Calçados",
            population: 35,
            color: coldColors[3],
            legendFontColor: "#000",
            legendFontSize: 12
        },
    ];

    const vendasRegionais = {
        labels: ["SP", "RJ", "MG", "ES", "RS"],
        datasets: [{ data: [1200, 900, 800, 400, 600] }],
    };

    // Cálculo dinâmico da largura do gráfico
    const chartWidth = screenWidth > 768
        ? screenWidth * 0.4 - 60  // Subtraindo padding para desktop
        : screenWidth - 80;  // Subtraindo padding para mobile

    const chartConfig = {
        backgroundColor: "transparent",
        backgroundGradientFrom: "transparent",
        backgroundGradientTo: "transparent",
        decimalPlaces: 0,
        color: (opacity = 1) => coldColors[0],
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: { borderRadius: 10 },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: coldColors[0]
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["white", "#bfbfbf"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.background}
            >
                {isMobile && !isMenuOpen && (
                    <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
                        <Ionicons name="menu" size={30} color="black" />
                    </TouchableOpacity>
                )}

                <SideMenu isOpen={isMenuOpen} isMobile={isMobile} toggleMenu={toggleMenu} />

                <View style={[
                    styles.headerContainer, 
                    !isMobile && styles.desktopHeaderContainer
                ]}>
                    <Text style={styles.header}>Dashboard</Text>
                </View>


                <ScrollView contentContainerStyle={styles.content}>

                    <View style={styles.infoCardsContainer}>
                        <View style={[styles.infoCard, { alignItems: 'center' }]}>
                            <Text style={styles.infoCardTitle}>Total de Vendas</Text>
                            <Text style={styles.infoCardValue}>R$ 12.500</Text>
                        </View>
                        <View style={[styles.infoCard, { alignItems: 'center' }]}>
                            <Text style={styles.infoCardTitle}>Vendas do Mês</Text>
                            <Text style={styles.infoCardValue}>R$ 2.000</Text>
                        </View>
                        <View style={[styles.infoCard, { alignItems: 'center' }]}>
                            <Text style={styles.infoCardTitle}>Novos Clientes</Text>
                            <Text style={styles.infoCardValue}>150</Text>
                        </View>
                        <View style={[styles.infoCard, { alignItems: 'center' }]}>
                            <Text style={styles.infoCardTitle}>Produtos Vendidos</Text>
                            <Text style={styles.infoCardValue}>850</Text>
                        </View>
                    </View>

                    <View style={styles.chartContainer}>
                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>Vendas Mensais</Text>
                            <View style={styles.chartWrapper}>
                                <LineChart
                                    data={vendasMensais}
                                    width={chartWidth}
                                    height={220}
                                    chartConfig={chartConfig}
                                    bezier
                                    style={styles.chartStyle}
                                />
                            </View>
                        </View>

                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>Comparação de Vendas</Text>
                            <View style={styles.chartWrapper}>
                                <BarChart
                                    data={vendasMensais}
                                    width={chartWidth}
                                    height={220}
                                    yAxisLabel="R$"
                                    chartConfig={chartConfig}
                                    showValuesOnTopOfBars
                                    style={styles.chartStyle}
                                />
                            </View>
                        </View>

                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>Vendas Regionais</Text>
                            <View style={styles.chartWrapper}>
                                <BarChart
                                    data={vendasRegionais}
                                    width={chartWidth}
                                    height={220}
                                    yAxisLabel="R$"
                                    chartConfig={chartConfig}
                                    showValuesOnTopOfBars
                                    style={styles.chartStyle}
                                />
                            </View>
                        </View>

                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>Vendas por Categoria</Text>
                            <View style={styles.chartWrapper}>
                                <PieChart
                                    data={vendasCategorias}
                                    width={chartWidth}
                                    height={220}
                                    chartConfig={chartConfig}
                                    accessor={"population"}
                                    backgroundColor="transparent"
                                    paddingLeft="15"
                                    absolute
                                    style={styles.chartStyle}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    headerContainer: {
        width: '100%',
        backgroundColor: 'black',
        paddingVertical: 15,
        alignItems: 'center',
    },
    desktopHeaderContainer: {
        paddingLeft: isMobile ? 0 : 250, // Adjust for side menu width
    },
    header: { 
        color: 'white', 
        fontSize: 24, 
        fontWeight: "bold", 
        textTransform: "uppercase",
        textAlign: 'center',
    },
    content: {
        flexGrow: 1,
        padding: 20,
        marginLeft: isMobile ? 0 : 250,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        textTransform: "uppercase"
    },
    chartContainer: {
        flexDirection: screenWidth > 768 ? "row" : "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    chartCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 20,
        width: screenWidth > 768 ? "48%" : "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    chartWrapper: {
        overflow: 'hidden',
        borderRadius: 10,
        padding: 10,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: 'center',
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
    },
    navContainer: {
        marginTop: 20,
        alignItems: "center"
    },
    navLink: {
        fontSize: 16,
        color: "blue",
        textDecorationLine: "underline"
    },
    hamburgerButton: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 20,
    },
    infoCardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 20,
        width: screenWidth > 768 ? "23%" : "48%",
    },
    infoCardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    infoCardValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
});

export default Dashboard;