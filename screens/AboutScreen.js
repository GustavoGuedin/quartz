import { Image, Linking, View } from "react-native"
import { Card, Divider, Icon, Text, TouchableRipple, useTheme } from "react-native-paper"
import styles from "../styles/Styles";

const AboutScreen = () => {
    const theme = useTheme();

    return (
        <View style={{ height: "100%", backgroundColor: theme.colors.background}}>
            <View style={styles.container}>
                <View style={{  }}>
                    <Image 
                        source={require("../assets/ruby6.png")} 
                        style={{ 
                            width: 200, 
                            height: 200, 
                            marginHorizontal: "auto", 
                            marginVertical: 32, 
                            borderRadius: 128, 
                            boxShadow: "rgba(0,0,0,0.2) 0 6 12, rgba(0,0,0,0.2) 0 16 32" }} 
                    />
                </View>
                <Card mode="contained" style={{boxShadow: "rgba(0,0,0,0.2) 0 6 12, rgba(0,0,0,0.2) 0 16 32"}}>
                    <Card.Content>
                        <Text variant="bodyLarge">
                            Um aplicativo de Android feito para calcular a metragem e os defeitos das peças de cerâmica.
                        </Text>
                        <Divider style={{ paddingVertical: 0.6, marginVertical: 16 }} />
                        <View style={{ display: "flex", alignItems: "center" }}>
                            <TouchableRipple onPress={() => Linking.openURL("https://github.com/GustavoGuedin/quartz/")}>
                                <Icon source="github" size={42} />
                            </TouchableRipple>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </View>
    )
}

export default AboutScreen