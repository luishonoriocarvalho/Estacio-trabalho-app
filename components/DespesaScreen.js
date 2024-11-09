import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DespesaScreen() {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const saveDespesa = async () => {
    const despesa = { date, amount, description };
    try {
      const storedDespesas = await AsyncStorage.getItem('despesas');
      const despesas = storedDespesas ? JSON.parse(storedDespesas) : [];
      despesas.push(despesa);
      await AsyncStorage.setItem('despesas', JSON.stringify(despesas));
      Alert.alert('Sucesso', 'Despesa adicionada com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar a despesa');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Data"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Valor"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Salvar Despesa" onPress={saveDespesa} color="#FFCA29" />
      </View>
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
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF', // Cor de fundo dos inputs
    borderColor: '#FFCA29', // Cor da borda
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    width: '60%', // Tamanho reduzido do botão
    marginTop: 20,
    borderRadius: 5,
  },
});
