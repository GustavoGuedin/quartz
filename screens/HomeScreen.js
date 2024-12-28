import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, TextInput, Card, FAB } from 'react-native-paper';
import { View } from 'react-native';
import styles from '../styles/Styles';

const HomeScreen = () => {
    const [producaoA, setProducaoA] = useState("");
    const [producaoC, setProducaoC] = useState("");
  
    const producaoMetrosA = producaoA * 0.36
    const producaoMetrosC = producaoC * 0.36
    const qualidade = (producaoC / (producaoA / 100) -100) * -1
  
    function limpar() {
      setProducaoA("");
      setProducaoC("");
    }
  
    return (
      <View style={{height: '100%'}}>
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
  
          <Button mode='contained' style={{display: 'none'}}>Calcular</Button>
  
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