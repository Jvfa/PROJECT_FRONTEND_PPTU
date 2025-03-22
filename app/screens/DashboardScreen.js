import React, { useState } from "react";
import { 
    View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity 
} from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "../components/SideMenu";

const screenWidth = Dimensions.get("window").width;
const isMobile = screenWidth < 768; // Define se é mobile

const vendasMensais = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [{ data: [500, 700, 800, 650, 900, 1200] }],
};

const vendasCategorias = [
    { name: "Roupas", population: 40, color: "blue", legendFontColor: "#000", legendFontSize: 12 },
    { name: "Acessórios", population: 25, color: "red", legendFontColor: "#000", legendFontSize: 12 },
    { name: "Calçados", population: 35, color: "green", legendFontColor: "#000", legendFontSize: 12 },
];

const vendasRegionais = {
    labels: ["SP", "RJ", "MG", "ES", "RS"],
    datasets: [{ data: [1200, 900, 800, 400, 600] }],
};

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <View style={styles.container}>
            {/* Botão hambúrguer apenas no mobile */}
            {isMobile && !isMenuOpen && (
                <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
                    <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
            )}

            {/* Menu lateral (fixo no desktop, sobreposto no mobile) */}
            <SideMenu isOpen={isMenuOpen} isMobile={isMobile} toggleMenu={toggleMenu} />

            {/* Conteúdo da página */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Dashboard</Text>

                {/* Novos cards com informações gerais */}
                <View style={styles.infoCardsContainer}>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoCardTitle}>Total de Vendas</Text>
                        <Text style={styles.infoCardValue}>R$ 12.500</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoCardTitle}>Vendas do Mês</Text>
                        <Text style={styles.infoCardValue}>R$ 2.000</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoCardTitle}>Novos Clientes</Text>
                        <Text style={styles.infoCardValue}>150</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Text style={styles.infoCardTitle}>Produtos Vendidos</Text>
                        <Text style={styles.infoCardValue}>850</Text>
                    </View>
                </View>

                {/* Gráficos */}
                <View style={styles.chartContainer}>
                    <View style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Vendas Mensais</Text>
                        <LineChart 
                            data={vendasMensais} 
                            width={screenWidth - 60} // Ajustando para garantir que não ultrapasse
                            height={220} 
                            chartConfig={chartConfig} 
                            bezier 
                        />
                    </View>

                    <View style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Comparação de Vendas</Text>
                        <BarChart 
                            data={vendasMensais} 
                            width={screenWidth - 60} // Ajustando para garantir que não ultrapasse
                            height={220} 
                            yAxisLabel="R$" 
                            chartConfig={chartConfig} 
                            showValuesOnTopOfBars 
                        />
                    </View>

                    <View style={styles.chartCard}>
                        <Text style={styles.chartTitle}>Vendas Regionais</Text>
                        <BarChart 
                            data={vendasRegionais} 
                            width={screenWidth - 60} // Ajustando para garantir que não ultrapasse
                            height={220} 
                            yAxisLabel="R$" 
                            chartConfig={chartConfig} 
                            showValuesOnTopOfBars 
                        />
                    </View>
                </View>

                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Vendas por Categoria</Text>
                    <PieChart 
                        data={vendasCategorias} 
                        width={screenWidth - 60} // Ajustando para garantir que não ultrapasse
                        height={220} // Ajustei para que a altura seja mais compatível com o card
                        chartConfig={chartConfig} 
                        accessor={"population"} 
                        backgroundColor="transparent" 
                        paddingLeft="15" 
                        absolute 
                    />
                </View>

                <View style={styles.navContainer}>
                    <Link href="/screens/Products" style={styles.navLink}>Ir para Produtos</Link>
                </View>
            </ScrollView>
        </View>
    );
};

const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#f3f3f3",
    backgroundGradientTo: "#f3f3f3",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 10 },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    content: {
        flex: 1,
        padding: 20,
        marginLeft: isMobile ? 0 : 250, // Garante que o conteúdo não fique por trás do menu no desktop
    },
    title: { 
        fontSize: 24, 
        fontWeight: "bold", 
        textAlign: "center", 
        marginBottom: 20 
    },
    chartContainer: {
        flexDirection: screenWidth > 768 ? "row" : "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    chartCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 20,
        width: screenWidth > 768 ? "48%" : "100%",
        overflow: 'hidden', // Isso impede que o gráfico ultrapasse os limites do card
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
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
