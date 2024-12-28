import { Text, Card, Divider, List, Icon, Portal, Dialog, Button, RadioButton, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import { useState } from 'react';

const ConfigScreen = () => {
  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [tamanhoPeca, setTamanhoPeca] = useState('60x60')

  const TamanhoPecaDialog = () => {
    return (
      <View>
        <Portal style={{}}>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Tamanho da peça</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group onValueChange={tamanhoPeca => setTamanhoPeca(tamanhoPeca)} value={tamanhoPeca}>
                <RadioButton.Item label='60x60' value='60x60' />
                <RadioButton.Item label='84x84' value='84x84' />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Concluído</Button>
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