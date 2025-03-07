import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHeaderTitle } from '@react-navigation/elements'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar, Button, Dialog, Divider, Menu, Portal, useTheme, Text } from 'react-native-paper';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import { DataContext } from "../contexts/DataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

import ConfigScreen from '../screens/ConfigScreen';
import PartialScreen from '../screens/PartialScreen';
import InputTileScreen from '../screens/InputTileScreen';
import AboutScreen from '../screens/AboutScreen';

function CustomNavigationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);

  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const deleteData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Erro ao excluir", error)
    }
  }

  const {
    productionACLineAHour1,
    setProductionACLineAHour1, setProductionACLineAHour2, setProductionACLineAHour3, setProductionACLineAHour4, setProductionACLineAHour5,
    setProductionACLineBHour1, setProductionACLineBHour2, setProductionACLineBHour3, setProductionACLineBHour4, setProductionACLineBHour5,
    setProductionCLineAHour1, setProductionCLineAHour2, setProductionCLineAHour3, setProductionCLineAHour4, setProductionCLineAHour5,
    setProductionCLineBHour5, setProductionCLineBHour1, setProductionCLineBHour2, setProductionCLineBHour3, setProductionCLineBHour4
  } = useContext(DataContext);

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
          <Dialog visible={dialogVisible} onDismiss={() => {hideDialog()}}>
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

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!back ? <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        anchorPosition='bottom'
      >
        <Menu.Item onPress={() => {navigation.navigate('Configurações'); closeMenu()}} title="Configurações" leadingIcon="cog-outline" />
        <Menu.Item onPress={() => {navigation.navigate('Sobre o app'); closeMenu()}} title="Sobre o app" leadingIcon="information-outline" />

        { productionACLineAHour1 ? <Divider style={{ marginHorizontal: 12, paddingVertical: 0.4, marginVertical: 4}} /> : null }
        { productionACLineAHour1 ? <Menu.Item theme={{ colors: { "onSurfaceVariant": theme.colors.error, "onSurface": theme.colors.error } }} onPress={() => {showDialog(); closeMenu()}} title="Zerar contagens" leadingIcon="trash-can-outline" /> : null }
      
      </Menu> : null }
      <ResetDialog />
    </Appbar.Header>
  )
}


const Tab = createMaterialBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Parcial" component={PartialScreen} options={{ 
          tabBarIcon: ({color}) => {
            return <Icon name="clipboard-list-outline" size={24} color={color}/>; 
          }, 
          }} 
        />
        <Tab.Screen name="Configurações" component={ConfigScreen} options={{ 
          tabBarIcon: ({color}) => {
            return <Icon name="cog-outline" size={24} color={color}/>; 
          }, 
          }} 
        />
    </Tab.Navigator>
  )
}


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ header: (props) => <CustomNavigationBar {...props} /> }}>
            <Stack.Screen name="Quartz" component={TabBar} />
            <Stack.Screen name="Configurações" component={ConfigScreen} />
            <Stack.Screen name="Adicionar parcial" component={InputTileScreen} />
            <Stack.Screen name="Sobre o app" component={AboutScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator;