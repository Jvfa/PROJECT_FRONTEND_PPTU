import React, { useRef } from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from "react-native";
import Navbar from "./Navbar"; // Importando a Navbar

const produtos = [
  {
    id: "1",
    nome: "Camiseta Branca",
    preco: "R$ 79,90",
    imagem: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    nome: "Jaqueta Jeans",
    preco: "R$ 199,90",
    imagem: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    nome: "Tênis Esportivo",
    preco: "R$ 299,90",
    imagem: "https://via.placeholder.com/150",
  },
];

const HomeScreen = () => {
  // Referência para o ScrollView
  const scrollViewRef = useRef(null);

  // Função para scroll até a seção de informações
  const scrollToInfo = () => {
    scrollViewRef.current?.scrollTo({ y: 500, animated: true }); // Defina o valor de 'y' para rolar até a seção desejada
  };

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <Navbar onInfoPress={scrollToInfo} /> {/* Passa a função de scroll para a Navbar */}
      
      <Text style={styles.titulo}>Novidades</Text>
      
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
          </View>
        )}
      />
      
      {/* Seção de informações sobre a loja */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Informações sobre a Loja</Text>
        <Text style={styles.infoText}>
          A nossa loja oferece uma variedade de produtos de alta qualidade. Aqui você
          encontra roupas, calçados e acessórios para todas as ocasiões. Todos os
          produtos são selecionados com muito cuidado para garantir a satisfação dos nossos clientes.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  imagem: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  preco: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  infoSection: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
});

export default HomeScreen;
