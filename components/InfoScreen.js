import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações</Text>
      <Text style={styles.text}>
        - Receita: Adicionar uma nova receita com data, valor e descrição.{'\n'}
        - Despesa: Adicionar uma nova despesa com data, valor e descrição.{'\n'}
        - Resumo: Exibe um gráfico de pizza com as receitas e despesas.{'\n'}
        - Ver Mercado: Mostra informações de ações do mercado financeiro.{'\n'}
        - Sair: Retorna para a tela de login.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#462B9D', // Cor de fundo
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFCA29', // Cor do título
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF', // Cor do texto
    lineHeight: 24,
    textAlign: 'left', // Alinhamento do texto à esquerda
  },
});
