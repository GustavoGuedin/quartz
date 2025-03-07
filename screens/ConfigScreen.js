import { Divider, List, Portal, Dialog, RadioButton, useTheme, Button } from 'react-native-paper';
import { View } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsContext } from '../contexts/SettingsContext';

const ConfigScreen = () => {
  const {
    tileSize, setTileSize,
    line, setLine,
    shift, setShift
  } = useContext(SettingsContext);

  const theme = useTheme();

  const [selectedDialog, setSelectedDialog] = useState("");
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
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
    loadData('@tile_size', setTileSize);
    loadData('@line', setLine);
    loadData('@shift', setShift);
  }, []);

  const TileSizeDialog = () => {
    return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={() => {hideDialog()}}>
            <Dialog.Title>Tamanho da peça</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group 
                onValueChange={
                  tileSize => {setTileSize(tileSize); 
                  saveData('@tile_size', tileSize); 
                  hideDialog()}} 
                value={tileSize}
              >
                <RadioButton.Item label='60x60' value='60x60' />
                <RadioButton.Item label='84x84' value='84x84' />
                <RadioButton.Item label='60x120' value='60x120' />
                <RadioButton.Item label='50x100' value='50x100' />
                <RadioButton.Item label='49x99' value='49x99' />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {hideDialog(); }}>Cancelar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  }

  const LineDialog = () => {
    return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={() => {hideDialog()}}>
            <Dialog.Title>Linha de produção</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group 
                onValueChange={
                  line => {setLine(line); 
                  saveData('@line', line); 
                  hideDialog()}} 
                value={line}
              >
                <RadioButton.Item label='Linha 1' value='1' />
                <RadioButton.Item label='Linha 2' value='2' />
                <RadioButton.Item label='Linha 3' value='3' />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {hideDialog(); }}>Cancelar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  }

  const ShiftDialog = () => {
    return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={() => {hideDialog()}}>
            <Dialog.Title>Turno de trabalho</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group 
                onValueChange={
                  shift => {setShift(shift); 
                  saveData('@shift', shift); 
                  hideDialog()}} 
                value={shift}
              >
                <RadioButton.Item label='Turno A' value='A' />
                <RadioButton.Item label='Turno B' value='B' />
                <RadioButton.Item label='Turno C' value='C' />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {hideDialog(); }}>Cancelar</Button>
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
          description={tileSize}
          onPress={() => { setSelectedDialog("tileSize"); showDialog() }}
        />
        
        <Divider />

        <List.Item
          title="Linha de produção"
          description={"Linha " + line}
          onPress={() => { setSelectedDialog("line"); showDialog() }}
        />

        <Divider />

        <List.Item
          title="Turno de trabalho"
          description={"Turno " + shift}
          onPress={() => { setSelectedDialog("shift"); showDialog() }}
        />
      { 
        selectedDialog == "tileSize"
          ? <TileSizeDialog />
          : selectedDialog == "line"
            ? <LineDialog />
            : <ShiftDialog />
      }
    </View>
  );
}

export default ConfigScreen;