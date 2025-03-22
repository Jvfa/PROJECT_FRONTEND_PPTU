import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import { Link } from "expo-router";
import SideMenu from "../components/SideMenu";

const screenWidth = Dimensions.get("window").width - 40; // Ajusta para mobile

// Dados fictícios para gráficos
const vendasMensais = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [{ data: [500, 700, 800, 650, 900, 1200] }],
};

const vendasCategorias = [
    { name: "Roupas", population: 40, color: "blue", legendFontColor: "#000", legendFontSize: 12 },
    { name: "Acessórios", population: 25, color: "red", legendFontColor: "#000", legendFontSize: 12 },
    { name: "Calçados", population: 35, color: "green", legendFontColor: "#000", legendFontSize: 12 },
];

const Dashboard = () => {
    return (
        <ScrollView style={styles.container}>
            <SideMenu />

            <Text style={styles.title}>Dashboard de Vendas</Text>

            {/* Gráfico de Linhas */}
            <Text style={styles.chartTitle}>Vendas Mensais</Text>
            <LineChart
                data={vendasMensais}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
            />

            {/* Gráfico de Colunas */}
            <Text style={styles.chartTitle}>Comparação de Vendas</Text>
            <BarChart
                data={vendasMensais}
                width={screenWidth}
                height={220}
                yAxisLabel="R$"
                chartConfig={chartConfig}
                showValuesOnTopOfBars
            />

            {/* Gráfico de Pizza */}
            <Text style={styles.chartTitle}>Vendas por Categoria</Text>
            <PieChart
                data={vendasCategorias}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />

            {/* Navegação */}
            <View style={styles.navContainer}>
                <Link href="/screens/Products" style={styles.navLink}>
                    Ir para Produtos
                </Link>
            </View>
        </ScrollView>
    );
};

// Configuração dos gráficos
const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#f3f3f3",
    backgroundGradientTo: "#dcdcdc",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 10 },
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    chartTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
    navContainer: { marginTop: 20, alignItems: "center" },
    navLink: { fontSize: 16, color: "blue", textDecorationLine: "underline" },
});

export default Dashboard;
