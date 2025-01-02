import { Divider, List, Portal, Dialog, RadioButton, useTheme, Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfigScreen = () => {
  const theme = useTheme();

  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [tamanhoPeca, setTamanhoPeca] = useState('')

  const saveData = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, val);
      console.log('Valor salvo com sucesso');
    } catch (error) {
      console.error('Erro ao salvar o valor:', error)
    }
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

  useEffect(() =>{
    loadData('@tamanhoPeca', setTamanhoPeca);
  }, []);

  const TamanhoPecaDialog = () => {
    return (
      <View>
        <Portal style={{}}>
          <Dialog visible={visible} onDismiss={() => {hideDialog(); saveData('@tamanhoPeca', tamanhoPeca); }}>
            <Dialog.Title>Tamanho da peça</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group onValueChange={tamanhoPeca => setTamanhoPeca(tamanhoPeca)} value={tamanhoPeca}>
                <RadioButton.Item label='60x60' value='60x60' />
                <RadioButton.Item label='84x84' value='84x84' />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {saveData('@tamanhoPeca', tamanhoPeca); hideDialog(); }}>Concluído</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: theme.colors.background, height: "100%" }}>

        <List.Item
          title="Tamanho da peça"
          description={tamanhoPeca}
          onPress={showDialog}
        />
        
        <Divider />

        <List.Item
          title="Linha"
          description="linha"
        />

        <Divider />

        <List.Item
          title="Turno"
          description="turno"
        />
      <TamanhoPecaDialog />
    </View>
  );
}

export default ConfigScreen;