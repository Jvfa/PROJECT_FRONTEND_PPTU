// app/components/SideMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Corrigido para garantir o uso dos ícones corretamente
import { useRouter } from 'expo-router';

const SideMenu = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/dashboard')}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Text style={styles.menuText}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/produtos')}>
        <Ionicons name="shirt-outline" size={24} color="black" />
        <Text style={styles.menuText}>Produtos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Fixa o menu lateral na tela
    top: 0,
    left: 0,
    width: 250, // Largura do menu lateral
    height: '100%', // Preenche toda a altura da tela
    backgroundColor: '#f4f4f4',
    paddingTop: 50,
    paddingLeft: 20,
    zIndex: 10, // Garante que o menu fique acima do conteúdo
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default SideMenu;
