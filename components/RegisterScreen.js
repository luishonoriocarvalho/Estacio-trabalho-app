import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Importa o método para registro
import { auth } from '../src/firebaseConfig';  // Importa a configuração do Firebase

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      // Realiza o registro no Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');  // Redireciona para a tela Home após registro
    } catch (error) {
      console.log(error.message);
      Alert.alert('Erro', 'Erro ao criar a conta');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Centralizada */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Campo de Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Campo de Senha */}
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Campo de Confirmar Senha */}
      <TextInput
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Botão de Criar Conta */}
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      {/* Link para a tela de Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem uma conta? Entre aqui</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#462B9D',  // Cor de fundo da tela
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,  // Ajuste o tamanho conforme necessário
    height: 100,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#D9D9D9',  // Cor de fundo dos inputs
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FFCA29',  // Cor do botão
    paddingVertical: 12,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  link: {
    color: '#FFCA29',  // Cor do link
    textDecorationLine: 'underline',
  },
};
