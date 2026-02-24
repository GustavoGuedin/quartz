import { View } from 'react-native';
import { useState } from 'react';
import {
  Card,
  TextInput,
  Text,
  useTheme,
  Appbar,
  RadioButton,
  IconButton,
} from 'react-native-paper';

const BreakageScreen = () => {
  const theme = useTheme();

  const [quebraPeso, setQuebraPeso] = useState();
  const [tamanho, setTamanho] = useState(22.38);
  const quebraMetragem = (quebraPeso / tamanho).toFixed(2);

  const clear = () => {
    setQuebraPeso('');
  };

  const Spacer = () => {
    return <View style={{ marginVertical: 10 }} />;
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: theme.colors.background,
          padding: 12,
          height: '100%',
        }}>
        <TextInput
          mode="outlined"
          label="Quantidade de quebra em KG"
          keyboardType="numeric"
          value={quebraPeso}
          onChangeText={(quebraPeso) => setQuebraPeso(quebraPeso)}
          maxLength={6}
        />

        <Spacer />

        <Card mode="outlined">
          <RadioButton.Group
            value={tamanho}
            onValueChange={(tamanho) => setTamanho(tamanho)}>
            <RadioButton.Item
              label="49x99"
              value={22.38}
            />
            <RadioButton.Item
              label="50x100"
              value={21.19}
            />
            <RadioButton.Item
              label="60x120"
              value={23.08}
            />
            <RadioButton.Item
              label="60x60"
              value={20.62}
            />
            <RadioButton.Item
              label="84x84"
              value={22.18}
            />
          </RadioButton.Group>
        </Card>

        <Spacer />

        <Card mode="outlined">
          <Card.Content>
            <Text>
              Metragem de quebra
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{ fontSize: 32, fontWeight: 'bold' }}
              >
                {quebraPeso ? quebraMetragem + ' m²' : '0.00 m²'}
              </Text>
              {quebraPeso ? (
                <IconButton
                  icon="trash-can-outline"
                  size={24}
                  onPress={clear}
                />
              ) : (
                <IconButton size={24} />
              )}
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

export default BreakageScreen