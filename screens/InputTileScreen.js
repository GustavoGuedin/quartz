import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import styles from "../styles/Styles";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "../contexts/DataContext";
import { SettingsContext } from "../contexts/SettingsContext";

const InputTileScreen = ({navigation}) => {
    const {
        productionACLineAHour1, setProductionACLineAHour1,
        productionACLineAHour2, setProductionACLineAHour2,
        productionACLineAHour3, setProductionACLineAHour3,
        productionACLineAHour4, setProductionACLineAHour4,
        productionACLineAHour5, setProductionACLineAHour5,

        setProductionACLineBHour1,
        setProductionACLineBHour2,
        setProductionACLineBHour3,
        setProductionACLineBHour4,
        setProductionACLineBHour5,

        setProductionCLineAHour1,
        setProductionCLineAHour2,
        setProductionCLineAHour3,
        setProductionCLineAHour4,
        setProductionCLineAHour5,

        setProductionCLineBHour1,
        setProductionCLineBHour2,
        setProductionCLineBHour3,
        setProductionCLineBHour4,
        setProductionCLineBHour5
    } = useContext(DataContext);

    const { line } = useContext(SettingsContext);

    const theme = useTheme();

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

    const saveValues = () => {
        if(!productionACLineAHour1) {
            saveData("@productionAC_lineA_hour1", inputACLineA);
            saveData("@productionC_lineA_hour1", inputCLineA);
            saveData("@productionAC_lineB_hour1", inputACLineB);
            saveData("@productionC_lineB_hour1", inputCLineB);
            setProductionACLineAHour1(inputACLineA);
            setProductionCLineAHour1(inputCLineA);
            setProductionACLineBHour1(inputACLineB);
            setProductionCLineBHour1(inputCLineB);
        } else if(!productionACLineAHour2) {
            saveData("@productionAC_lineA_hour2", inputACLineA);
            saveData("@productionC_lineA_hour2", inputCLineA);
            saveData("@productionAC_lineB_hour2", inputACLineB);
            saveData("@productionC_lineB_hour2", inputCLineB);
            setProductionACLineAHour2(inputACLineA);
            setProductionCLineAHour2(inputCLineA);
            setProductionACLineBHour2(inputACLineB);
            setProductionCLineBHour2(inputCLineB);
        } else if(!productionACLineAHour3) {
            saveData("@productionAC_lineA_hour3", inputACLineA);
            saveData("@productionC_lineA_hour3", inputCLineA);
            saveData("@productionAC_lineB_hour3", inputACLineB);
            saveData("@productionC_lineB_hour3", inputCLineB);
            setProductionACLineAHour3(inputACLineA);
            setProductionCLineAHour3(inputCLineA);
            setProductionACLineBHour3(inputACLineB);
            setProductionCLineBHour3(inputCLineB);
        } else if(!productionACLineAHour4) {
            saveData("@productionAC_lineA_hour4", inputACLineA);
            saveData("@productionC_lineA_hour4", inputCLineA);
            saveData("@productionAC_lineB_hour4", inputACLineB);
            saveData("@productionC_lineB_hour4", inputCLineB);
            setProductionACLineAHour4(inputACLineA);
            setProductionCLineAHour4(inputCLineA);
            setProductionACLineBHour4(inputACLineB);
            setProductionCLineBHour4(inputCLineB);
        } else if(!productionACLineAHour5) {
            saveData("@productionAC_lineA_hour5", inputACLineA);
            saveData("@productionC_lineA_hour5", inputCLineA);
            saveData("@productionAC_lineB_hour5", inputACLineB);
            saveData("@productionC_lineB_hour5", inputCLineB);
            setProductionACLineAHour5(inputACLineA);
            setProductionCLineAHour5(inputCLineA);
            setProductionACLineBHour5(inputACLineB);
            setProductionCLineBHour5(inputCLineB);
        }
    }

    return(
        <View style={{backgroundColor: theme.colors.background, height: "100%"}}>
            <View style={styles.container}>
                <Text variant="labelLarge" style={{color: theme.colors.primary, marginVertical: 6}}>{ "Linha " + line + "A" }</Text>
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

                <Text variant="labelLarge" style={{color: theme.colors.primary, marginVertical: 6}}>{ "Linha " + line + "B" }</Text>
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
                    style={{backgroundColor: !inputACLineA || !inputACLineB || !inputCLineA || !inputCLineB ? theme.colors.surfaceDisabled : theme.colors.primary}}
                >Salvar</Button>
            </View>
        </View>
    )
}

export default InputTileScreen