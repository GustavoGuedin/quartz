import { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "../styles/Styles";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InputTileScreen = ({navigation}) => {
    const theme = useTheme();

    const [productionACLineAHour1, setProductionACLineAHour1] = useState("");
    const [productionACLineAHour2, setProductionACLineAHour2] = useState("");
    const [productionACLineAHour3, setProductionACLineAHour3] = useState("");
    const [productionACLineAHour4, setProductionACLineAHour4] = useState("");
    const [productionACLineAHour5, setProductionACLineAHour5] = useState("");

    const [inputACLineA, setInputACLineA] = useState("");
    const [inputACLineB, setInputACLineB] = useState("");
    const [inputCLineA, setInputCLineA] = useState("");
    const [inputCLineB, setInputCLineB] = useState("");

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
            } 
        } catch (error) {
            console.error('Erro ao ler o valor: ', error)
        }
    }

    useEffect(() =>{
        loadData('@productionAC_lineA_hour1', setProductionACLineAHour1);
        loadData('@productionAC_lineA_hour2', setProductionACLineAHour2);
        loadData('@productionAC_lineA_hour3', setProductionACLineAHour3);
        loadData('@productionAC_lineA_hour4', setProductionACLineAHour4);
        loadData('@productionAC_lineA_hour5', setProductionACLineAHour5);
    }, []);

    const saveValues = () => {
        if(!productionACLineAHour1) {
            saveData("@productionAC_lineA_hour1", inputACLineA);
            saveData("@productionC_lineA_hour1", inputCLineA);
            saveData("@productionAC_lineB_hour1", inputACLineB);
            saveData("@productionC_lineB_hour1", inputCLineB);
        } else if(!productionACLineAHour2) {
            saveData("@productionAC_lineA_hour2", inputACLineA);
            saveData("@productionC_lineA_hour2", inputCLineA);
            saveData("@productionAC_lineB_hour2", inputACLineB);
            saveData("@productionC_lineB_hour2", inputCLineB);
        } else if(!productionACLineAHour3) {
            saveData("@productionAC_lineA_hour3", inputACLineA);
            saveData("@productionC_lineA_hour3", inputCLineA);
            saveData("@productionAC_lineB_hour3", inputACLineB);
            saveData("@productionC_lineB_hour3", inputCLineB);
        } else if(!productionACLineAHour4) {
            saveData("@productionAC_lineA_hour4", inputACLineA);
            saveData("@productionC_lineA_hour4", inputCLineA);
            saveData("@productionAC_lineB_hour4", inputACLineB);
            saveData("@productionC_lineB_hour4", inputCLineB);
        } else if(!productionACLineAHour5) {
            saveData("@productionAC_lineA_hour5", inputACLineA);
            saveData("@productionC_lineA_hour5", inputCLineA);
            saveData("@productionAC_lineB_hour5", inputACLineB);
            saveData("@productionC_lineB_hour5", inputCLineB);
        }
    }

    return(
        <View style={{backgroundColor: theme.colors.background, height: "100%"}}>
            <View style={styles.container}>
                <Text variant="labelLarge" style={{color: theme.colors.primary, marginVertical: 6}}>Linha 1A</Text>
                <TextInput
                    label="Quantidade de peças A+C"
                    mode="outlined"
                    keyboardType="numeric"
                    value={inputACLineA}
                    onChangeText={inputACLineA => setInputACLineA(inputACLineA)}
                    style={{marginVertical: 4}}
                />
                <TextInput
                    label="Quantidade de peças C"
                    mode="outlined"
                    keyboardType="numeric"
                    style={{marginBottom: 24, marginVertical: 4}}
                    value={inputCLineA}
                    onChangeText={inputCLineA => setInputCLineA(inputCLineA)}
                />

                <Text variant="labelLarge" style={{color: theme.colors.primary, marginVertical: 6}}>Linha 1B</Text>
                <TextInput
                    label="Quantidade de peças A+C"
                    mode="outlined"
                    keyboardType="numeric"
                    style={{marginVertical: 4}}
                    value={inputACLineB}
                    onChangeText={inputACLineB => setInputACLineB(inputACLineB)}
                />
                <TextInput
                    label="Quantidade de peças C"
                    mode="outlined"
                    keyboardType="numeric"
                    style={{marginBottom: 32, marginVertical: 4}}
                    value={inputCLineB}
                    onChangeText={inputCLineB => setInputCLineB(inputCLineB)}
                />

                <Button mode="contained" 
                    disabled={ !inputACLineA || !inputACLineB || !inputCLineA || !inputCLineB ? true : false }
                    onPress={() => {saveValues(); navigation.goBack()}}
                >Salvar</Button>
            </View>
        </View>
    )
}

export default InputTileScreen