import HomeScreen from "./screens/HomeScreen";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} /> {/* Esconde o título */}
      <HomeScreen />
    </>
  );
}
