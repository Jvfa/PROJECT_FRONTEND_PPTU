import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView, Animated } from "react-native";
import Navbar from "./Navbar"; // Importando a Navbar

const produtos = [
  { id: "1", nome: "Camiseta Branca", preco: "R$ 79,90", imagem: require("../../assets/images/Produtos/camisabranca.png") },
  { id: "2", nome: "Jaqueta Jeans", preco: "R$ 199,90", imagem: require("../../assets/images/Produtos/jaquetaJeans.png") },
  { id: "4", nome: "Camiseta Preta", preco: "R$ 89,90", imagem: require("../../assets/images/Produtos/camisaP.webp") },
  { id: "5", nome: "Calça Jeans", preco: "R$ 159,90", imagem: require("../../assets/images/Produtos/calçaJeans.webp") },
  { id: "6", nome: "Terno Slim Azul", preco: "R$ 459,90", imagem: require("../../assets/images/Produtos/Ternoazul.png") },
  { id: "7", nome: "Calça Cinza", preco: "R$ 156,90", imagem: require("../../assets/images/Produtos/calcaCinza.png") },
  { id: "8", nome: "Bota Harness", preco: "R$ 898,90", imagem: require("../../assets/images/Produtos/harness.jpg") },
  { id: "9", nome: "Sobretudo Masculino", preco: "R$ 458,90", imagem: require("../../assets/images/Produtos/sobretudo.jpg") },
];

const banners = [
  require("../../assets/images/BlackBanner1.png"),
  require("../../assets/images/BlackBanner2.png"),
];

const HomeScreen = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef(null);
  const sobrePos = useRef(0);
  const novidadesPos = useRef(0);

  // Altera o banner com fade a cada 10s
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [fadeAnim]);

  // Função para rolar até "Sobre a Empresa"
  const scrollToSobre = () => {
    scrollViewRef.current?.scrollTo({ y: sobrePos.current, animated: true });
  };

  // Função para rolar até "Novidades"
  const scrollToNovidades = () => {
    scrollViewRef.current?.scrollTo({ y: novidadesPos.current, animated: true });
  };

  // Função otimizada para renderizar os produtos
  const renderProduto = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>{item.preco}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar onNovidadesPress={scrollToNovidades} onInformacoesPress={scrollToSobre} />

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
        {/* Banner rotativo */}
        <View style={styles.bannerContainer}>
          <Animated.Image source={banners[currentBannerIndex]} style={[styles.banner, { opacity: fadeAnim }]} resizeMode="cover" />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titulo}>Novidades</Text>
        </View>

        {/* Lista de Produtos Horizontal */}
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.produtosContainer}
          renderItem={renderProduto}
          onLayout={(event) => { novidadesPos.current = event.nativeEvent.layout.y; }}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titulo}>Sobre a empresa</Text>
        </View>

        {/* Seção Sobre a Empresa */}
        <View 
          onLayout={(event) => { sobrePos.current = event.nativeEvent.layout.y; }} 
          style={styles.sobreContainer}
        >
          <View style={styles.sobreCard}>
            <Image source={require("../../assets/images/sobreimg.jpg")} style={styles.sobreImagem} resizeMode="cover" />
            <View style={styles.sobreTexto}>
              <Text style={styles.sobreDescricao}>
                Somos uma marca de moda masculina formal, focada em oferecer peças sofisticadas e elegantes para homens que buscam estilo e conforto.
                Nosso objetivo é criar roupas que atendam às necessidades do homem moderno, com qualidade e design inovador.
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingTop: 5,
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
    marginRight: 40,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  imagem: {
    width: "100%",
    height: 180,
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
    backgroundColor: "#eeeeee",
    width: "100%",
    height: "100%",
    borderRadius: 8,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sobreImagem: {
    width: "48%",
    height: "100%",
    borderRadius: 8,
  },
  sobreTexto: {
    width: "48%",
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
