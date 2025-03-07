import { ScrollView, View } from "react-native";
import styles from "../styles/Styles";
import { Card, Divider, FAB, Icon, List, SegmentedButtons, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { DataContext } from "../contexts/DataContext";

const PartialScreen = ({ navigation }) => {
    const {
        tileSize, setTileSize,
        line, setLine,
        shift, setShift
    } = useContext(SettingsContext);

    const {
        productionACLineAHour1, setProductionACLineAHour1,
        productionACLineAHour2, setProductionACLineAHour2,
        productionACLineAHour3, setProductionACLineAHour3,
        productionACLineAHour4, setProductionACLineAHour4,
        productionACLineAHour5, setProductionACLineAHour5,

        productionACLineBHour1, setProductionACLineBHour1,
        productionACLineBHour2, setProductionACLineBHour2,
        productionACLineBHour3, setProductionACLineBHour3,
        productionACLineBHour4, setProductionACLineBHour4,
        productionACLineBHour5, setProductionACLineBHour5,

        productionACLineA,
        productionACLineB,

        productionCLineAHour1, setProductionCLineAHour1,
        productionCLineAHour2, setProductionCLineAHour2,
        productionCLineAHour3, setProductionCLineAHour3,
        productionCLineAHour4, setProductionCLineAHour4,
        productionCLineAHour5, setProductionCLineAHour5,

        productionCLineBHour1, setProductionCLineBHour1,
        productionCLineBHour2, setProductionCLineBHour2,
        productionCLineBHour3, setProductionCLineBHour3,
        productionCLineBHour4, setProductionCLineBHour4,
        productionCLineBHour5, setProductionCLineBHour5,

        productionCLineA,
        productionCLineB
    } = useContext(DataContext);

    const [tileSizeMetreage, setTileSizeMetreage] = useState("");

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

    useEffect(() =>{
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
                        title={ "Linha " + line + "A" }
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
                        title={ "Linha " + line + "B" }
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
                    </View>

                </List.Accordion>
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
                { !productionACLineAHour5 ? <View style={{marginVertical: 32}} /> : null }
            </ScrollView>
            { !productionACLineAHour5 ? <FAB icon="plus" label="Adicionar parcial" style={styles.fab} onPress={() => navigation.navigate("Adicionar parcial") } /> : null }
        </View>
    )
}

export default PartialScreen;