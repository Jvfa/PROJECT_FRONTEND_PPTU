import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView, Animated, TouchableOpacity } from "react-native";
import Navbar from "./Navbar"; // Importando a Navbar

const produtos = [
  {
    id: "1",
    nome: "Camiseta Branca",
    preco: "R$ 79,90",
    imagem: require("../../assets/images/Produtos/camisabranca.png"),
  },
  {
    id: "2",
    nome: "Jaqueta Jeans",
    preco: "R$ 199,90",
    imagem: require("../../assets/images/Produtos/jaquetaJeans.png"),
  },
  {
    id: "4",
    nome: "Camiseta Preta",
    preco: "R$ 89,90",
    imagem: require("../../assets/images/Produtos/camisaP.webp"),
  },
  {
    id: "5",
    nome: "Calça Jeans",
    preco: "R$ 159,90",
    imagem: require("../../assets/images/Produtos/calçaJeans.webp"),
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
  const sobreRef = useRef(null); // Referência para a seção "Sobre a Empresa"

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

  // Função para rolar até a seção "Sobre a Empresa"
  const scrollToSobre = () => {
    sobreRef.current?.scrollIntoView({ behavior: "smooth" }); // Rola para a seção "Sobre a Empresa"
  };

  return (
    <View style={styles.container}>
      <Navbar onNovidadesPress={scrollToSobre} /> {/* Passando a função para a Navbar */}

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

        {/* Lista de Produtos Horizontal */}
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          horizontal={true}  // Exibir os cards na horizontal
          showsHorizontalScrollIndicator={false}  // Esconde a barra de rolagem
          contentContainerStyle={styles.produtosContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.imagem} style={styles.imagem} />
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>{item.preco}</Text>
            </View>
          )}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titulo}>Sobre a empresa</Text>
        </View>

        {/* Seção Sobre a Empresa */}
        <View ref={sobreRef} style={styles.sobreContainer}>
          <View style={styles.sobreCard}>
            <Image
              source={require("../../assets/images/sobreimg.jpg")} // Substitua com a imagem da empresa
              style={styles.sobreImagem}
              resizeMode="cover"
            />
            <View style={styles.sobreTexto}>
              <Text style={styles.sobreDescricao}>
                Somos uma marca de moda masculina formal, focada em oferecer peças
                sofisticadas e elegantes para homens que buscam estilo e conforto.
                Nosso objetivo é criar roupas que atendem às necessidades do homem moderno,
                com qualidade e design inovador.
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingTop: 5, // Deixa espaço para a navbar fixa
    padding: 5,
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
  produtosContainer: {
    paddingVertical: 50,
  },
  card: {
    backgroundColor: "#eeeeee",
    padding: 15,
    marginRight: 40, // margem entre os cards
    borderRadius: 8,
    width: 200, // largura do card
    alignItems: "center",
  },
  imagem: {
    width: "100%",
    height: 180, // altura da imagem
    borderRadius: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  preco: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },
  bannerContainer: {
    width: "100%",
    height: 600,
    marginBottom: 50,
  },
  banner: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  sobreContainer: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  sobreCard: {
    backgroundColor: "#eeeeee", // Fundo da área de sobre a empresa
    width: "100%", // Ocupa 100% da largura
    height: "100%", // Garante que a altura seja ocupada igualmente
    borderRadius: 8,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Garantir que imagem e texto ocupem o mesmo espaço
  },
  sobreImagem: {
    width: "48%", // Ajuste para ocupar 48% da largura
    height: "100%", // Ocupa 100% da altura disponível
    borderRadius: 8,
  },
  sobreTexto: {
    width: "48%", // Ocupa 48% da largura
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  sobreDescricao: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
});

export default HomeScreen;
