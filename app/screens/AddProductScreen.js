import React, { useState, useEffect } from "react";
import {
  View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity,
  TextInput, Modal, Alert, FlatList, Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SideMenu from "../components/SideMenu";
import { Picker } from "@react-native-picker/picker";

const screenWidth = Dimensions.get("window").width;
const isMobile = screenWidth < 768;

// Tipos de produtos disponíveis
const tiposProdutos = [
  { id: 'camiseta', nome: 'Camiseta', icone: 'tshirt-crew' },
  { id: 'calca', nome: 'Calça', icone: 'seat-legroom-normal' },
  { id: 'calcado', nome: 'Calçado', icone: 'shoe-sneaker' },
  { id: 'acessorio', nome: 'Acessório', icone: 'watch' },
  { id: 'outro', nome: 'Outro', icone: 'package-variant-closed' }
];

// Cores disponíveis
const coresProdutos = [
  { id: 'preto', nome: 'Preto' },
  { id: 'branco', nome: 'Branco' },
  { id: 'azul', nome: 'Azul' },
  { id: 'vermelho', nome: 'Vermelho' },
  { id: 'verde', nome: 'Verde' },
  { id: 'amarelo', nome: 'Amarelo' },
  { id: 'roxo', nome: 'Roxo' },
  { id: 'outraCor', nome: 'Outra' }
];

const Products = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Iniciando sem produtos pré-cadastrados
  const [produtos, setProdutos] = useState([]);
  // Contador para gerar IDs automáticos
  const [nextId, setNextId] = useState(1);

  // Estado para o formulário - sem campo ID
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'camiseta',
    cor: 'preto',
    preco: '',
    caracteristicas: ''
  });

  // Estado para edição
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Estado para modal de detalhes
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estados para filtros - sem campo ID
  const [filtros, setFiltros] = useState({
    nome: '',
    tipo: '',
    cor: '',
    preco: ''
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleFilterChange = (field, value) => {
    setFiltros({
      ...filtros,
      [field]: value
    });
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      tipo: 'camiseta',
      cor: 'preto',
      preco: '',
      caracteristicas: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  const adicionarOuEditarProduto = () => {
    // Validações de campos específicos
    if (!formData.nome.trim()) {
      if (Platform.OS === 'web') {
        alert("Por favor, preencha o campo Nome");
      } else {
        Alert.alert("Campo obrigatório", "Por favor, preencha o campo Nome");
      }
      return;
    }

    if (!formData.preco.trim()) {
      if (Platform.OS === 'web') {
        alert("Por favor, preencha o campo Preço");
      } else {
        Alert.alert("Campo obrigatório", "Por favor, preencha o campo Preço");
      }
      return;
    }

    // Validar se o preço é um número válido
    if (isNaN(parseFloat(formData.preco)) || parseFloat(formData.preco) <= 0) {
      if (Platform.OS === 'web') {
        alert("Por favor, insira um valor válido para Preço");
      } else {
        Alert.alert("Valor inválido", "Por favor, insira um valor válido para Preço");
      }
      return;
    }

    if (isEditing) {
      // Atualizar produto existente
      const updatedProdutos = produtos.map(produto =>
        produto.id === currentId ? { ...formData, id: currentId } : produto
      );
      setProdutos(updatedProdutos);

      if (Platform.OS === 'web') {
        alert("Produto atualizado com sucesso!");
      } else {
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      }
    } else {
      // Adicionar novo produto com ID automático
      const newProduct = {
        ...formData,
        id: nextId.toString()
      };

      setProdutos([...produtos, newProduct]);
      setNextId(nextId + 1);

      if (Platform.OS === 'web') {
        alert("Produto adicionado com sucesso!");
      } else {
        Alert.alert("Sucesso", "Produto adicionado com sucesso!");
      }
    }

    resetForm();
  };

  const editarProduto = (id) => {
    const produtoParaEditar = produtos.find(produto => produto.id === id);
    if (produtoParaEditar) {
      // Não incluímos o ID no formulário já que será gerenciado pelo sistema
      const { id: produtoId, ...produtoSemId } = produtoParaEditar;
      setFormData(produtoSemId);
      setIsEditing(true);
      setCurrentId(produtoId);
    }
  };

  // Função corrigida para excluir produtos
  const excluirProduto = (id) => {
    const produtoId = String(id);

    const confirmarExclusao = () => {
      const novoProdutos = produtos.filter(produto => String(produto.id) !== produtoId);
      setProdutos(novoProdutos);

      if (modalVisible && selectedProduct && String(selectedProduct.id) === produtoId) {
        setModalVisible(false);
        setSelectedProduct(null);
      }

      Alert.alert("Sucesso", "Produto excluído com sucesso!");
    };

    if (Platform.OS === 'web') {
      const confirmado = confirm("Tem certeza que deseja excluir este produto?");
      if (confirmado) confirmarExclusao();
    } else {
      Alert.alert(
        "Confirmação",
        "Tem certeza que deseja excluir este produto?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Excluir", onPress: confirmarExclusao, style: "destructive" }
        ]
      );
    }
  };


  const verProduto = (produto) => {
    setSelectedProduct(produto);
    setModalVisible(true);
  };

  const getIconeParaTipo = (tipo) => {
    const tipoProduto = tiposProdutos.find(t => t.id === tipo);
    return tipoProduto ? tipoProduto.icone : 'help-circle';
  };

  const produtosFiltrados = produtos.filter(produto => {
    return (
      (filtros.nome === '' || produto.nome.toLowerCase().includes(filtros.nome.toLowerCase())) &&
      (filtros.tipo === '' || produto.tipo === filtros.tipo) &&
      (filtros.cor === '' || produto.cor === filtros.cor) &&
      (filtros.preco === '' || parseFloat(produto.preco) <= parseFloat(filtros.preco) || filtros.preco === '0')
    );
  });

  const limparFiltros = () => {
    setFiltros({
      nome: '',
      tipo: '',
      cor: '',
      preco: ''
    });
  };

  // Cálculo de produtos para paginação
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = produtosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(produtosFiltrados.length / productsPerPage);

  // Funções para navegação de páginas
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["white", "#bfbfbf"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        {isMobile && !isMenuOpen && (
          <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
            <Ionicons name="menu" size={30} color="black" />
          </TouchableOpacity>
        )}

        <SideMenu isOpen={isMenuOpen} isMobile={isMobile} toggleMenu={toggleMenu} />

        <View style={[
          styles.headerContainer,
          !isMobile && styles.desktopHeaderContainer
        ]}>
          <Text style={styles.header}>Produtos</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Formulário para adicionar/editar produtos - sem campo ID */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {isEditing ? "Editar Produto" : "Adicionar Novo Produto"}
            </Text>

            <View style={styles.formRow}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Nome*</Text>
                <TextInput
                  style={styles.input}
                  value={formData.nome}
                  onChangeText={(text) => handleInputChange('nome', text)}
                  placeholder="Digite o nome do produto"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Tipo*</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.tipo}
                    onValueChange={(value) => handleInputChange('tipo', value)}
                    style={styles.picker}
                  >
                    {tiposProdutos.map((tipo) => (
                      <Picker.Item key={tipo.id} label={tipo.nome} value={tipo.id} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Cor*</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.cor}
                    onValueChange={(value) => handleInputChange('cor', value)}
                    style={styles.picker}
                  >
                    {coresProdutos.map((cor) => (
                      <Picker.Item key={cor.id} label={cor.nome} value={cor.id} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Preço*</Text>
                <TextInput
                  style={styles.input}
                  value={formData.preco}
                  onChangeText={(text) => handleInputChange('preco', text)}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Características (opcional)</Text>
                <TextInput
                  style={styles.inputMultiline}
                  value={formData.caracteristicas}
                  onChangeText={(text) => handleInputChange('caracteristicas', text)}
                  placeholder="Descreva as características do produto"
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={adicionarOuEditarProduto}
              >
                <Text style={styles.buttonText}>
                  {isEditing ? "Atualizar" : "Adicionar"}
                </Text>
              </TouchableOpacity>

              {isEditing && (
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={resetForm}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Área de filtros - sem campo ID */}
          <View style={styles.filtersContainer}>
            <TouchableOpacity
              style={styles.filterToggle}
              onPress={() => setMostrarFiltros(!mostrarFiltros)}
            >
              <Ionicons name={mostrarFiltros ? "chevron-up" : "chevron-down"} size={24} color="black" />
              <Text style={styles.filterToggleText}>Filtros</Text>
            </TouchableOpacity>

            {mostrarFiltros && (
              <View style={styles.filtersContent}>
                <View style={styles.formRow}>
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                      style={styles.input}
                      value={filtros.nome}
                      onChangeText={(text) => handleFilterChange('nome', text)}
                      placeholder="Filtrar por nome"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Tipo</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={filtros.tipo}
                        onValueChange={(value) => handleFilterChange('tipo', value)}
                        style={styles.picker}
                      >
                        <Picker.Item label="Todos" value="" />
                        {tiposProdutos.map((tipo) => (
                          <Picker.Item key={tipo.id} label={tipo.nome} value={tipo.id} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>

                <View style={styles.formRow}>
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Cor</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={filtros.cor}
                        onValueChange={(value) => handleFilterChange('cor', value)}
                        style={styles.picker}
                      >
                        <Picker.Item label="Todas" value="" />
                        {coresProdutos.map((cor) => (
                          <Picker.Item key={cor.id} label={cor.nome} value={cor.id} />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Preço máximo</Text>
                    <TextInput
                      style={styles.input}
                      value={filtros.preco}
                      onChangeText={(text) => handleFilterChange('preco', text)}
                      placeholder="Preço máximo"
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={styles.formRow}>
                  <View style={styles.formGroup}>
                    <TouchableOpacity
                      style={[styles.button, styles.clearButton]}
                      onPress={limparFiltros}
                    >
                      <Text style={styles.buttonText}>Limpar Filtros</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Lista de produtos */}
          <View style={styles.productListContainer}>
            <Text style={styles.listTitle}>Lista de Produtos</Text>
            <Text style={styles.resultCount}>
              {produtosFiltrados.length} produtos encontrados
            </Text>

            {produtosFiltrados.length > 0 ? (
              <>
                {currentProducts.map((produto) => (
                  <View key={produto.id} style={styles.productCard}>
                    {/* Mantém o código do card de produto como estava */}
                    <View style={styles.productInfo}>
                      <View style={styles.productIconContainer}>
                        <MaterialCommunityIcons
                          name={getIconeParaTipo(produto.tipo)}
                          size={32}
                          color="#444"
                        />
                      </View>

                      <View style={styles.productDetails}>
                        <Text style={styles.productId}>#{produto.id}</Text>
                        <Text style={styles.productName}>{produto.nome}</Text>
                        <View style={styles.productMetaRow}>
                          <Text style={styles.productMeta}>
                            {tiposProdutos.find(t => t.id === produto.tipo)?.nome || produto.tipo}
                          </Text>
                          <Text style={styles.productMetaSeparator}>•</Text>
                          <Text style={styles.productMeta}>
                            {coresProdutos.find(c => c.id === produto.cor)?.nome || produto.cor}
                          </Text>
                          <Text style={styles.productMetaSeparator}>•</Text>
                          <Text style={styles.productPrice}>
                            R$ {parseFloat(produto.preco).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.productActions}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.viewButton]}
                        onPress={() => verProduto(produto)}
                      >
                        <Ionicons name="eye" size={20} color="white" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => editarProduto(produto.id)}
                      >
                        <Ionicons name="pencil" size={20} color="white" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => excluirProduto(produto.id)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="trash" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Controles de paginação */}
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
                    onPress={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <Ionicons name="chevron-back" size={18} color={currentPage === 1 ? "#ccc" : "#333"} />
                  </TouchableOpacity>

                  <View style={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.pageNumberButton,
                          currentPage === index + 1 && styles.activePageButton
                        ]}
                        onPress={() => goToPage(index + 1)}
                      >
                        <Text
                          style={[
                            styles.pageNumberText,
                            currentPage === index + 1 && styles.activePageText
                          ]}
                        >
                          {index + 1}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
                    onPress={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <Ionicons name="chevron-forward" size={18} color={currentPage === totalPages ? "#ccc" : "#333"} />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text style={styles.noProductsText}>
                Nenhum produto encontrado. Adicione seu primeiro produto!
              </Text>
            )}
          </View>
        </ScrollView>

        {/* Modal para visualizar detalhes do produto */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedProduct && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Detalhes do Produto</Text>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalIconHeader}>
                    <MaterialCommunityIcons
                      name={getIconeParaTipo(selectedProduct.tipo)}
                      size={48}
                      color="#444"
                    />
                    <Text style={styles.modalProductName}>{selectedProduct.nome}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>ID:</Text>
                    <Text style={styles.detailValue}>{selectedProduct.id}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Tipo:</Text>
                    <Text style={styles.detailValue}>
                      {tiposProdutos.find(t => t.id === selectedProduct.tipo)?.nome || selectedProduct.tipo}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Cor:</Text>
                    <Text style={styles.detailValue}>
                      {coresProdutos.find(c => c.id === selectedProduct.cor)?.nome || selectedProduct.cor}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Preço:</Text>
                    <Text style={styles.detailValue}>
                      R$ {parseFloat(selectedProduct.preco).toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.characteristicsContainer}>
                    <Text style={styles.detailLabel}>Características:</Text>
                    <Text style={styles.characteristicsText}>
                      {selectedProduct.caracteristicas || "Nenhuma característica especificada"}
                    </Text>
                  </View>

                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.editButton]}
                      onPress={() => {
                        setModalVisible(false);
                        editarProduto(selectedProduct.id);
                      }}
                    >
                      <Text style={styles.modalButtonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.modalButton, styles.deleteButton]}
                      onPress={() => {
                        setModalVisible(false);
                        excluirProduto(selectedProduct.id);
                      }}
                    >
                      <Text style={styles.modalButtonText}>Excluir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.modalButton, styles.closeModalButton]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.modalButtonText}>Fechar</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: 'black',
    paddingVertical: 15,
    alignItems: 'center',
  },
  desktopHeaderContainer: {
    paddingLeft: isMobile ? 0 : 250, // Adjust for side menu width
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    marginLeft: isMobile ? 0 : 250,
  },
  hamburgerButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 20,
  },
  // Estilos para o formulário
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  formRow: {
    flexDirection: isMobile ? 'column' : 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  formGroup: {
    flex: 1,
    marginBottom: 12,
    marginRight: isMobile ? 0 : 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  clearButton: {
    backgroundColor: '#607D8B',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Estilos para os filtros
  filtersContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterToggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  filtersContent: {
    padding: 16,
  },
  // Estilos para a lista de produtos
  productListContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 200,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  resultCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  productCard: {
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'stretch' : 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3f51b5',
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  productIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productId: {
    fontSize: 12,
    color: '#666',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  productMeta: {
    fontSize: 14,
    color: '#555',
  },
  productMetaSeparator: {
    marginHorizontal: 5,
    color: '#aaa',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  productActions: {
    flexDirection: 'row',
    marginTop: isMobile ? 12 : 0,
    justifyContent: isMobile ? 'flex-end' : 'flex-start',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  viewButton: {
    backgroundColor: '#2196F3',
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  noProductsText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#666',
    fontStyle: 'italic',
  },
  // Estilos para o modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: isMobile ? '90%' : '50%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalIconHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalProductName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 120,
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  characteristicsContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  characteristicsText: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#9E9E9E',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  closeModalButton: {
    backgroundColor: '#607D8B',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Estilos para paginação
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  paginationButtonDisabled: {
    backgroundColor: '#f9f9f9',
    opacity: 0.5,
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pageNumberButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  activePageButton: {
    backgroundColor: '#3f51b5',
  },
  pageNumberText: {
    fontSize: 14,
    color: '#333',
  },
  activePageText: {
    color: 'white',
    fontWeight: 'bold',
  }

});

export default Products;
