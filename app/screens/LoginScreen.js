import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarSenha = (senha) =>
    /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);

  const handleLogin = () => {
    if (!email || !senha) {
      setErrorMessage("Preencha todos os campos.");
      setSuccessMessage("");
      return;
    }

    if (!validarEmail(email)) {
      setErrorMessage("E-mail inválido.");
      setSuccessMessage("");
      setEmail("");
      return;
    }

    if (!validarSenha(senha)) {
      setErrorMessage(
        "Senha inválida."
      );
      setSuccessMessage("");
      setSenha("");
      return;
    }

    // Login bem-sucedido
    setErrorMessage("");
    setSuccessMessage("Login realizado com sucesso!");

    // Limpa os campos
    setEmail("");
    setSenha("");

    // Remove a mensagem de sucesso após 2 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <ImageBackground
      source={{ uri: "https://via.placeholder.com/800x600" }}
      style={styles.background}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Acesse o sistema</Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            autoCapitalize="none"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </View>

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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Não tem uma conta? <Text style={styles.registerLink}>Registrar</Text>
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
    width: "80%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
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
    color: "#000",
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
    color: "#000",
  },
  registerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
