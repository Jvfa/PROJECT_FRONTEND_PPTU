import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

// Configuração necessária para o login com Google
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Usando redirect local
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  console.log("Redirect URI:", redirectUri); // Log para depuração

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "559420564949-b9sf24ifttl6iu8e9uieej2p49mf91p4.apps.googleusercontent.com", // Use apenas o Client ID da Web
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      // O token está na propriedade id_token para useIdTokenAuthRequest
      const { id_token } = response.params;
      console.log("Login bem-sucedido, token:", id_token);

      setErrorMessage("");
      setSuccessMessage("Login com Google realizado com sucesso!");
      setTimeout(() => {
        router.push("/dashboard");
        setSuccessMessage("");
      }, 2000);
    } else if (response?.type === "error") {
      console.error("Erro de login:", response.error);
      setErrorMessage(`Erro no login com Google: ${response.error?.description || "Tente novamente"}`);
    }
  }, [response]);

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
      return;
    }

    if (!validarSenha(senha)) {
      setErrorMessage("Senha inválida.");
      setSuccessMessage("");
      setSenha("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("Login realizado com sucesso!");
    setEmail("");
    setSenha("");
    setTimeout(() => {
      router.push("/dashboard");
      setSuccessMessage("");
    }, 2000);
  };

  const handleGoogleLogin = async () => {
    try {
      setErrorMessage("");
      console.log("Iniciando login com Google...");
      const result = await promptAsync();
      console.log("Resultado do prompt:", result);
    } catch (error) {
      console.error("Erro ao iniciar login com Google:", error);
      setErrorMessage("Erro ao iniciar login com Google: " + error.message);
    }
  };

  return (
    <LinearGradient
      colors={["white", "#bfbfbf"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

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
            onSubmitEditing={handleLogin} // Corrigido: handleSubmit → handleLogin
            returnKeyType="next" // Move para o próximo campo quando pressionar Enter
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
            onSubmitEditing={handleLogin} // Corrigido: handleSubmit → handleLogin
            returnKeyType="done" // Submete o formulário ao pressionar Enter
          />
        </View>

        <View style={styles.row}>
          <Pressable onPress={() => setLembrar(!lembrar)}>
            <Text style={[styles.text, lembrar && styles.textBold]}>
              {lembrar ? "☑ Lembre de mim" : "☐ Lembre de mim"}
            </Text>
          </Pressable>
          <Pressable>
            <Text style={styles.text}>Esqueceu a senha?</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleLogin} // Corrigido: handleSubmit → handleLogin
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? "#707070" // Cinza escuro quando pressionado
                : isHovered
                  ? "#909090" // Cinza médio ao passar o mouse por cima (somente no Web)
                  : "#fff", // Cinza claro padrão
            },
          ]}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          activeOpacity={0.7}
        >
          <View style={styles.googleButtonContent}>
            <Ionicons name="logo-google" size={20} color="#4285F4" style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>Continuar com Google</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Não tem uma conta? <Text style={styles.registerLink} onPress={() => router.push("/register")}>Registrar</Text>
        </Text>
      </View>
    </LinearGradient>
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
    backgroundColor: "rgba(254, 254, 255, 0)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
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
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  registerText: {
    fontSize: 14,
    color: "#000",
  },
  registerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#d0d0d0",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: "#444",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default LoginScreen;