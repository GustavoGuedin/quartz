import { ScrollView, View } from "react-native";
import styles from "../styles/Styles";
import { Button, Card, Divider, FAB, Icon, List, SegmentedButtons, Text, useTheme, Portal, Dialog } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

const PartialScreen = ({ navigation }) => {
    const theme = useTheme();

    const [tileSize, setTileSize] = useState("");
    const [line, setLine] = useState("");
    const [shift, setShift] = useState("");
    const [tileSizeMetreage, setTileSizeMetreage] = useState("");

    const [productionACLineAHour1, setProductionACLineAHour1] = useState("");
    const [productionACLineAHour2, setProductionACLineAHour2] = useState("");
    const [productionACLineAHour3, setProductionACLineAHour3] = useState("");
    const [productionACLineAHour4, setProductionACLineAHour4] = useState("");
    const [productionACLineAHour5, setProductionACLineAHour5] = useState("");

    const [productionACLineBHour1, setProductionACLineBHour1] = useState("");
    const [productionACLineBHour2, setProductionACLineBHour2] = useState("");
    const [productionACLineBHour3, setProductionACLineBHour3] = useState("");
    const [productionACLineBHour4, setProductionACLineBHour4] = useState("");
    const [productionACLineBHour5, setProductionACLineBHour5] = useState("");

    const productionACLineA = [
        productionACLineAHour1,
        productionACLineAHour2,
        productionACLineAHour3,
        productionACLineAHour4,
        productionACLineAHour5
    ]

    const productionACLineB = [
        productionACLineBHour1,
        productionACLineBHour2,
        productionACLineBHour3,
        productionACLineBHour4,
        productionACLineBHour5
    ]
    
    const [productionCLineAHour1, setProductionCLineAHour1] = useState("");
    const [productionCLineAHour2, setProductionCLineAHour2] = useState("");
    const [productionCLineAHour3, setProductionCLineAHour3] = useState("");
    const [productionCLineAHour4, setProductionCLineAHour4] = useState("");
    const [productionCLineAHour5, setProductionCLineAHour5] = useState("");

    const [productionCLineBHour1, setProductionCLineBHour1] = useState("");
    const [productionCLineBHour2, setProductionCLineBHour2] = useState("");
    const [productionCLineBHour3, setProductionCLineBHour3] = useState("");
    const [productionCLineBHour4, setProductionCLineBHour4] = useState("");
    const [productionCLineBHour5, setProductionCLineBHour5] = useState("");

    const productionCLineA = [
        productionCLineAHour1,
        productionCLineAHour2,
        productionCLineAHour3,
        productionCLineAHour4,
        productionCLineAHour5
    ]

    const productionCLineB = [
        productionCLineBHour1,
        productionCLineBHour2,
        productionCLineBHour3,
        productionCLineBHour4,
        productionCLineBHour5
    ]

    const [selectedHour, setSelectedHour] = useState(1);

    const [expandedA, setExpandedA] = useState(true);
    const [expandedB, setExpandedB] = useState(true);

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

    const deleteData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error("Erro ao excluir", error)
        }
    }

    useFocusEffect(
        useCallback(() =>{
            loadData('@tile_size', setTileSize);
            loadData('@line', setLine);
            loadData('@shift', setShift);

            loadData('@productionAC_lineA_hour1', setProductionACLineAHour1);
            loadData('@productionAC_lineA_hour2', setProductionACLineAHour2);
            loadData('@productionAC_lineA_hour3', setProductionACLineAHour3);
            loadData('@productionAC_lineA_hour4', setProductionACLineAHour4);
            loadData('@productionAC_lineA_hour5', setProductionACLineAHour5);

            loadData('@productionAC_lineB_hour1', setProductionACLineBHour1);
            loadData('@productionAC_lineB_hour2', setProductionACLineBHour2);
            loadData('@productionAC_lineB_hour3', setProductionACLineBHour3);
            loadData('@productionAC_lineB_hour4', setProductionACLineBHour4);
            loadData('@productionAC_lineB_hour5', setProductionACLineBHour5);

            loadData('@productionC_lineA_hour1', setProductionCLineAHour1);
            loadData('@productionC_lineA_hour2', setProductionCLineAHour2);
            loadData('@productionC_lineA_hour3', setProductionCLineAHour3);
            loadData('@productionC_lineA_hour4', setProductionCLineAHour4);
            loadData('@productionC_lineA_hour5', setProductionCLineAHour5);

            loadData('@productionC_lineB_hour1', setProductionCLineBHour1);
            loadData('@productionC_lineB_hour2', setProductionCLineBHour2);
            loadData('@productionC_lineB_hour3', setProductionCLineBHour3);
            loadData('@productionC_lineB_hour4', setProductionCLineBHour4);
            loadData('@productionC_lineB_hour5', setProductionCLineBHour5);
        }, [])
    );
    
    useEffect(() => {
        if (tileSize === '60x60') {
        setTileSizeMetreage(0.36);
        } else if (tileSize === '84x84') {
        setTileSizeMetreage(0.7067);
        } else if (tileSize === '60x120') {
        setTileSizeMetreage(0.72);
        } else if (tileSize === '50x100') {
        setTileSizeMetreage(0.5);
        } else if (tileSize === '49x99') {
        setTileSizeMetreage(0.48);
        }
    }, [tileSize]);



    const ProductionCards = () => {
        return (
            <View>
                <List.Accordion
                        title="Linha 1A"
                        right={() => expandedA ? <List.Icon icon="chevron-up" /> : <List.Icon icon="chevron-down" />}
                        expanded={expandedA}
                        onPress={() => setExpandedA(!expandedA)}
                        style={{marginTop: 8}}
                        rippleColor="#00000000"
                    >

                    <View style={styles.cardView}>
                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Produção A+C {'\n'}Acumuldada</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">{(productionACLineA[selectedHour - 1] * tileSizeMetreage).toFixed(0)} m²</Text>
                                <Text variant="labelMedium">{productionACLineA[selectedHour - 1]} peças</Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Produção A+C {'\n'}Hora</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">
                                    {selectedHour == 1 
                                    ? (productionACLineA[selectedHour - 1] * tileSizeMetreage).toFixed(0) 
                                    : (productionACLineA[selectedHour - 1] * tileSizeMetreage).toFixed(0) - (productionACLineA[selectedHour - 2] * tileSizeMetreage).toFixed(0) } m²
                                </Text>
                                <Text variant="labelMedium">
                                    {selectedHour == 1 
                                    ? productionACLineA[selectedHour - 1]
                                    : productionACLineA[selectedHour - 1] - productionACLineA[selectedHour - 2] } peças
                                </Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Produção C {'\n'}Acumuldada</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">{(productionCLineA[selectedHour - 1] * tileSizeMetreage).toFixed(0)} m²</Text>
                                <Text variant="labelMedium">{productionCLineA[selectedHour - 1]} peças</Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Produção C {'\n'}Hora</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">
                                    {selectedHour == 1 
                                    ? (productionCLineA[selectedHour - 1] * tileSizeMetreage).toFixed(0) 
                                    : (productionCLineA[selectedHour - 1] * tileSizeMetreage).toFixed(0) - (productionCLineA[selectedHour - 2] * tileSizeMetreage).toFixed(0) } m²
                                </Text>
                                <Text variant="labelMedium">
                                    {selectedHour == 1 
                                    ? productionCLineA[selectedHour - 1]
                                    : productionCLineA[selectedHour - 1] - productionCLineA[selectedHour - 2] } peças
                                </Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Qualidade {'\n'}Acumuldada</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">{((productionCLineA[selectedHour -1] / (productionACLineA[selectedHour - 1] / 100) -100) * -1).toFixed(1)}%</Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Qualidade {'\n'}Hora</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">
                                    {selectedHour == 1
                                    ? ((productionCLineA[selectedHour -1] / (productionACLineA[selectedHour - 1] / 100) -100) * -1).toFixed(1)
                                    : (((productionCLineA[selectedHour -1] - productionCLineA[selectedHour - 2]) / ((productionACLineA[selectedHour - 1] - productionACLineA[selectedHour - 2]) / 100) -100) * -1).toFixed(1)}%
                                </Text>
                            </Card.Content>
                        </Card>
                    </View>

                    </List.Accordion>

                    <List.Accordion
                        title="Linha 1B"
                        right={() => expandedB ? <List.Icon icon="chevron-up" /> : <List.Icon icon="chevron-down" />}
                        expanded={expandedB}
                        onPress={() => setExpandedB(!expandedB)}
                        rippleColor="#00000000"
                    >

                    <View style={styles.cardView}>
                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Produção A+C {'\n'}Acumuldada</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">{(productionACLineB[selectedHour - 1] * tileSizeMetreage).toFixed(0)} m²</Text>
                                <Text variant="labelMedium">{productionACLineB[selectedHour - 1]} peças</Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Produção A+C {'\n'}Hora</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">
                                    {selectedHour == 1 
                                    ? (productionACLineB[selectedHour - 1] * tileSizeMetreage).toFixed(0) 
                                    : (productionACLineB[selectedHour - 1] * tileSizeMetreage).toFixed(0) - (productionACLineB[selectedHour - 2] * tileSizeMetreage).toFixed(0) } m²
                                </Text>
                                <Text variant="labelMedium">
                                    {selectedHour == 1 
                                    ? productionACLineB[selectedHour - 1]
                                    : productionACLineB[selectedHour - 1] - productionACLineB[selectedHour - 2] } peças
                                </Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Produção C {'\n'}Acumuldada</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">{(productionCLineB[selectedHour - 1] * tileSizeMetreage).toFixed(0)} m²</Text>
                                <Text variant="labelMedium">{productionCLineB[selectedHour - 1]} peças</Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Produção C {'\n'}Hora</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">
                                    {selectedHour == 1 
                                    ? (productionCLineB[selectedHour - 1] * tileSizeMetreage).toFixed(0) 
                                    : (productionCLineB[selectedHour - 1] * tileSizeMetreage).toFixed(0) - (productionCLineB[selectedHour - 2] * tileSizeMetreage).toFixed(0) } m²
                                </Text>
                                <Text variant="labelMedium">
                                    {selectedHour == 1 
                                    ? productionCLineB[selectedHour - 1]
                                    : productionCLineB[selectedHour - 1] - productionCLineB[selectedHour - 2] } peças
                                </Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Qualidade {'\n'}Acumuldada</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">{((productionCLineB[selectedHour -1] / (productionACLineB[selectedHour - 1] / 100) -100) * -1).toFixed(1)}%</Text>
                            </Card.Content>
                        </Card>

                        <Card mode="contained" style={styles.card}>
                            <Card.Content>
                                <Text variant="titleSmall">Qualidade {'\n'}Hora</Text>
                                <Divider style={styles.divider} />
                                <Text variant="displaySmall">
                                    {selectedHour == 1
                                    ? ((productionCLineB[selectedHour -1] / (productionACLineB[selectedHour - 1] / 100) -100) * -1).toFixed(1)
                                    : (((productionCLineB[selectedHour -1] - productionCLineB[selectedHour - 2]) / ((productionACLineB[selectedHour - 1] - productionACLineB[selectedHour - 2]) / 100) -100) * -1).toFixed(1)}%
                                </Text>
                            </Card.Content>
                        </Card>
                        <Button mode="contained" style={{backgroundColor: theme.colors.error, width: "100%", marginVertical: 16}} onPress={() => showDialog()}>Zerar contagens</Button>
                    </View>

                </List.Accordion>
                <ResetDialog />
            </View>
        )
    }

    const EmptyProduction = () => {
        return(
            <View style={{marginTop: "50%"}}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Icon source="clipboard-text-off-outline" size={100} />
                    <Text variant="titleLarge" style={{fontWeight: "bold", textAlign: "center"}}>Nenhuma parcial adicionada</Text>
                    <Text style={{textAlign: "center"}}>Toque em "Adicionar parcial" para adicionar a primeira</Text>
                </View>
            </View>
        )
    }

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const ResetData = () => {
        deleteData("@productionAC_lineA_hour1")
        deleteData("@productionAC_lineA_hour2")
        deleteData("@productionAC_lineA_hour3")
        deleteData("@productionAC_lineA_hour4")
        deleteData("@productionAC_lineA_hour5")

        deleteData("@productionC_lineA_hour1")
        deleteData("@productionC_lineA_hour2")
        deleteData("@productionC_lineA_hour3")
        deleteData("@productionC_lineA_hour4")
        deleteData("@productionC_lineA_hour5")

        deleteData("@productionAC_lineB_hour1")
        deleteData("@productionAC_lineB_hour2")
        deleteData("@productionAC_lineB_hour3")
        deleteData("@productionAC_lineB_hour4")
        deleteData("@productionAC_lineB_hour5")

        deleteData("@productionC_lineB_hour1")
        deleteData("@productionC_lineB_hour2")
        deleteData("@productionC_lineB_hour3")
        deleteData("@productionC_lineB_hour4")
        deleteData("@productionC_lineB_hour5")

        setProductionACLineAHour1("")
        setProductionACLineAHour2("")
        setProductionACLineAHour3("")
        setProductionACLineAHour4("")
        setProductionACLineAHour5("")

        setProductionCLineAHour1("")
        setProductionCLineAHour2("")
        setProductionCLineAHour3("")
        setProductionCLineAHour4("")
        setProductionCLineAHour5("")

        setProductionACLineBHour1("")
        setProductionACLineBHour2("")
        setProductionACLineBHour3("")
        setProductionACLineBHour4("")
        setProductionACLineBHour5("")

        setProductionCLineBHour1("")
        setProductionCLineBHour2("")
        setProductionCLineBHour3("")
        setProductionCLineBHour4("")
        setProductionCLineBHour5("")

    }

    const ResetDialog = () => {
        return (
            <View>
              <Portal>
                <Dialog visible={visible} onDismiss={() => {hideDialog()}}>
                  <Dialog.Title>Atenção</Dialog.Title>
                  <Dialog.Content>
                    <Text>Você tem certeza que deseja zerar as contagens?</Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={() => {hideDialog()}}>Não</Button>
                    <Button onPress={() => {ResetData(); hideDialog()}}>Sim</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
        )
    }

    return(
        <View style={styles.fullscreen}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{flex: 1, alignItems: "center", display: productionACLineAHour1 ? "flex" : "none" }}>
                        <SegmentedButtons
                            value={selectedHour}
                            onValueChange={setSelectedHour}
                            buttons={[
                                {
                                    label: "6:00",
                                    value: 1
                                },
                                {
                                    label: "7:30",
                                    value: 2,
                                    disabled: productionACLineAHour2 ? false : true
                                },
                                {
                                    label: "9:00",
                                    value: 3,
                                    disabled: productionACLineAHour3 ? false : true
                                },
                                {
                                    label: "10:30",
                                    value: 4,
                                    disabled: productionACLineAHour4 ? false : true
                                },
                                {
                                    label: "12:00",
                                    value: 5,
                                    disabled: productionACLineAHour5 ? false : true
                                },
                            ]}
                        />
                    </View>

                    { productionACLineA[selectedHour - 1] ? <ProductionCards /> : <EmptyProduction /> }
                </View>
                <View style={{marginVertical: 32}} />
            </ScrollView>
            <FAB icon="plus" label="Adicionar parcial" style={styles.fab} onPress={() => navigation.navigate("Adicionar parcial") } />
        </View>
    )
}

export default PartialScreen;