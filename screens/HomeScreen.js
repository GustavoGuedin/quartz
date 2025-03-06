import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, Card, FAB } from 'react-native-paper';
import { View } from 'react-native';
import styles from '../styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
    const [tamanhoPeca, setTamanhoPeca] = useState('');
    const [tamanhoPecaMetragem, setTamanhoPecaMetragem] = useState('');

    const [producaoA, setProducaoA] = useState("");
    const [producaoC, setProducaoC] = useState("");
  
    const producaoMetrosA = producaoA * tamanhoPecaMetragem
    const producaoMetrosC = producaoC * tamanhoPecaMetragem
    const qualidade = (producaoC / (producaoA / 100) -100) * -1
  
    function limpar() {
      setProducaoA("");
      setProducaoC("");
    }
  
    const loadData = async (key, variable) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          variable(value);
        } else {
          console.log('Nenhum valor encontrado')
        }
      } catch (error) {
        console.error('Erro ao ler o valor: ', error)
      }
    }
  
    useFocusEffect(
      useCallback(() =>{
        loadData('@tile_size', setTamanhoPeca);
      }, [])
    );

    useEffect(() => {
      if (tamanhoPeca === '60x60') {
      setTamanhoPecaMetragem(0.36);
      } else if (tamanhoPeca === '84x84') {
      setTamanhoPecaMetragem(0.7067);
      } else if (tamanhoPeca === '60x120') {
      setTamanhoPecaMetragem(0.72);
      } else if (tamanhoPeca === '50x100') {
      setTamanhoPecaMetragem(0.5);
      } else if (tamanhoPeca === '49x99') {
      setTamanhoPecaMetragem(0.48);
      }
    }, [tamanhoPeca]);
  
    return (
      <View style={styles.fullscreen}>
        <View style={styles.container}>
  
          <View style={styles.textInput}>
            <TextInput 
              label='Produção A+C' 
              mode='outlined' 
              keyboardType='numeric'
              value={producaoA}
              onChangeText={producaoA => setProducaoA(producaoA)}
              style={{width: '48%'}} 
            />
            <TextInput 
              label='Produção C' 
              mode='outlined' 
              keyboardType='numeric'
              value={producaoC}
              onChangeText={producaoC => setProducaoC(producaoC)}
              style={{width: '48%'}} 
            />
          </View>
  
          <Card>
            <Card.Content>
              <Text variant='bodyLarge' style={{marginVertical: 8}}>Produção A+C: {producaoMetrosA.toFixed(1)} m²</Text>
              <Text variant='bodyLarge' style={{marginVertical: 8}}>Produção C: {producaoMetrosC.toFixed(1)} m²</Text>
              <Text variant='bodyLarge' style={{marginVertical: 8}}>Qualidade: {qualidade.toFixed(1)}%</Text>
            </Card.Content>
          </Card>
  
          <StatusBar style="auto" />
  
        </View>
      
        <FAB
          icon='trash-can-outline'
          label='Limpar'
          style={styles.fab}
          onPress={() => limpar()}
        />
      </View>
    );
  }

  export default HomeScreen;