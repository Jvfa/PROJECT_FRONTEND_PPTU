import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarSenha = (senha) => {
    const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
  };

  const handleLogin = () => {
    if (!validarEmail(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }
    if (!validarSenha(senha)) {
      Alert.alert(
        "Erro",
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial."
      );
      return;
    }
    Alert.alert("Sucesso", "Login realizado com sucesso!");
  };

  return (
    <ImageBackground
      source={{ uri: "https://via.placeholder.com/800x600" }} // Substitua por sua imagem de fundo
      style={styles.background}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Acesse o sistema</Text>

        {/* Campo de E-mail */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Campo de Senha */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Lembrar de mim & Esqueci a senha */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setLembrar(!lembrar)}>
            <Text style={[styles.text, lembrar && styles.textBold]}>
              {lembrar ? "☑ Lembre de mim" : "☐ Lembre de mim"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Login */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Link para Registro */}
        <Text style={styles.registerText}>
          Não tem uma conta?{" "}
          <Text style={styles.registerLink}>Registrar</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Efeito vidro
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backdropFilter: "blur(10px)", // Suaviza o fundo
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: "#fff",
  },
  textBold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  registerText: {
    fontSize: 14,
    color: "#fff",
  },
  registerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
