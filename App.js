import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import { SplashScreen } from 'expo-splash-screen';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Impede que a SplashScreen se esconda automaticamente
    SplashScreen.preventAutoHideAsync();

    // Simulação de carregamento dos recursos
    const loadResources = async () => {
      // Carregue seus recursos, fontes, imagens, etc.

      // Quando os recursos estiverem prontos, esconda a SplashScreen
      SplashScreen.hideAsync();
    };

    loadResources();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}