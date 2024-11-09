import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StatusBar, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function ResumoScreen() {
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const storedReceitas = await AsyncStorage.getItem('receitas');
      const storedDespesas = await AsyncStorage.getItem('despesas');
      setReceitas(storedReceitas ? JSON.parse(storedReceitas) : []);
      setDespesas(storedDespesas ? JSON.parse(storedDespesas) : []);
    };
    loadData();
  }, []);

  const totalReceitas = receitas.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const totalDespesas = despesas.reduce((sum, item) => sum + parseFloat(item.amount), 0);

  const data = [
    { name: 'Receitas', amount: totalReceitas, color: '#FFBC00', legendFontColor: '#FFFFFF', legendFontSize: 15 },
    { name: 'Despesas', amount: totalDespesas, color: '#D50000', legendFontColor: '#FFFFFF', legendFontSize: 15 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#462B9D" />
      
      <Text style={styles.title}>Resumo</Text>

      <PieChart
        data={data}
        width={Dimensions.get('window').width - 50}
        height={220}
        chartConfig={{
          backgroundColor: '#462B9D',
          backgroundGradientFrom: '#462B9D',
          backgroundGradientTo: '#462B9D',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,  // Cor do gráfico com texto claro
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <FlatList
        data={[...receitas, ...despesas]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.date} - {item.description}: </Text>
            <Text style={styles.tableCell}>R$ {parseFloat(item.amount).toFixed(2)}</Text>
          </View>
        )}
        contentContainerStyle={styles.tableBody}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#462B9D',  // Cor de fundo agora com #462B9D
    paddingTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFBC00',  // Nome em amarelo
  },
  tableBody: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  tableCell: {
    fontSize: 16,
    color: '#FFF', // Cor do texto em branco
  },
});
