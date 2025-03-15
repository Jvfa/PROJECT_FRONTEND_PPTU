import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import CheckBox from "expo-checkbox"; // Importando o checkbox

const RegisterScreen = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false); // Estado para o checkbox
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarSenha = (senha) =>
    /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);
  const validarCpf = (cpf) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  const validarCep = (cep) => /^\d{5}-\d{3}$/.test(cep);

  const formatarCpf = (cpf) =>
    cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

  const formatarCep = (cep) =>
    cep.replace(/\D/g, "").replace(/^(\d{5})(\d{3})$/, "$1-$2");

  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        setErrors((prev) => ({ ...prev, cep: "" }));
      } else {
        setErrors((prev) => ({ ...prev, cep: "CEP inválido." }));
        setEndereco("");
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, cep: "Erro ao buscar o CEP." }));
    }
  };

  const handleRegister = () => {
    let newErrors = {};

    if (!nome) newErrors.nome = "Nome é obrigatório.";
    if (!email) newErrors.email = "E-mail é obrigatório.";
    else if (!validarEmail(email)) newErrors.email = "E-mail inválido.";
    if (!senha) newErrors.senha = "Senha é obrigatória.";
    else if (!validarSenha(senha))
      newErrors.senha = "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial.";
    if (!cpf) newErrors.cpf = "CPF é obrigatório.";
    else if (!validarCpf(cpf)) newErrors.cpf = "CPF inválido.";
    if (!cep) newErrors.cep = "CEP é obrigatório.";
    else if (!validarCep(cep)) newErrors.cep = "CEP inválido.";
    if (!endereco) newErrors.endereco = "Endereço é obrigatório.";
    if (!acceptTerms) newErrors.acceptTerms = "Você deve aceitar os termos e condições.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage("Cadastro realizado com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <LinearGradient colors={["white", "#bfbfbf"]} style={styles.background}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#555" />
          <TextInput style={styles.input} placeholder="Nome Completo" value={nome} onChangeText={setNome} />
        </View>
        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#555" />
          <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#555" />
          <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
        </View>
        {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="CEP"
            keyboardType="numeric"
            value={cep}
            onChangeText={(text) => {
              const formattedCep = formatarCep(text);
              setCep(formattedCep);
              if (formattedCep.length === 9) buscarCep(formattedCep);
            }}
            maxLength={9}
          />
        </View>
        {errors.cep && <Text style={styles.errorText}>{errors.cep}</Text>}

        <View style={styles.inputContainer}>
          <Ionicons name="home-outline" size={20} color="#555" />
          <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} editable={false} />
        </View>
        {errors.endereco && <Text style={styles.errorText}>{errors.endereco}</Text>}

        <View style={styles.inputContainer}>
          <Ionicons name="card-outline" size={20} color="#555" />
          <TextInput style={styles.input} placeholder="CPF" keyboardType="numeric" value={cpf} onChangeText={(text) => setCpf(formatarCpf(text))} maxLength={14} />
        </View>
        {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

        {/* CheckBox para LGPD */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={acceptTerms}
            onValueChange={setAcceptTerms}
            color={acceptTerms ? "#000" : undefined}
          />
          <Text
            style={styles.checkboxText}
            onPress={() => setAcceptTerms(!acceptTerms)} // Permite marcar/desmarcar ao tocar no texto
          >
            Eu aceito os <Text style={styles.linkText}>termos e condições</Text>, <Text style={styles.linkText}>política de privacidade</Text>.
          </Text>
        </View>
        {errors.acceptTerms && <Text style={styles.errorText}>{errors.acceptTerms}</Text>}

        <Pressable onPress={handleRegister} style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>

        {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 5,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    transition: "background-color 0.3s",
  },
  buttonPressed: {
    backgroundColor: "#707070", // When button is pressed
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  successMessage: {
    marginTop: 15,
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
  },
  linkText: {
    textDecorationLine: "underline", // Adiciona sublinhado
    color: "#000", // Mantém a cor pretar
    cursor: "pointer", // Simula um link clicável
  },
});

export default RegisterScreen;
