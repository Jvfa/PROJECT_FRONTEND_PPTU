import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView, Animated } from "react-native";
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

const banners = [
  require("../../assets/images/BlackBanner1.png"),  // Imagem local 1
  require("../../assets/images/BlackBanner2.png"),  // Imagem local 2
];

const HomeScreen = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Inicializa com fadeAnim 1 (totalmente visível)
  const scrollViewRef = useRef(null); // Referência para o ScrollView

  // Altera a imagem do banner a cada 10 segundos com animação de fade
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // duração do fadeOut (500ms)
        useNativeDriver: true,
      }).start(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500, // duração do fadeIn (500ms)
          useNativeDriver: true,
        }).start();
      });
    }, 10000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, [fadeAnim]);

  // Função para rolar até a seção de Novidades
  const scrollToNovidades = () => {
    scrollViewRef.current.scrollTo({ y: 650, animated: true }); // Ajuste o valor de y conforme a altura da seção
  };

  return (
    <View style={styles.container}>
      <Navbar onNovidadesPress={scrollToNovidades} /> {/* Passando a função para a Navbar */}
      
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
        {/* Banner rotativo */}
        <View style={styles.bannerContainer}>
          <Animated.Image
            source={banners[currentBannerIndex]}
            style={[styles.banner, { opacity: fadeAnim }]}
            resizeMode="cover"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titulo}>Novidades</Text>
        </View>

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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    paddingTop: 80, // Deixa espaço para a navbar fixa
    padding: 16,
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
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
  bannerContainer: {
    width: "100%",
    height: 600,
    marginBottom: 16,
  },
  banner: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});

export default HomeScreen;
