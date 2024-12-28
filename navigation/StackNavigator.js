import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getHeaderTitle } from '@react-navigation/elements'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import HomeScreen from '../screens/HomeScreen';
import ConfigScreen from '../screens/ConfigScreen';
import HistoryScreen from '../screens/HistoryScreen';

function CustomNavigationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!back ? <Appbar.Action icon="cog" onPress={() => navigation.navigate('Configurações')} /> : null}
    </Appbar.Header>
  )
}


const Tab = createMaterialBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Calcular" component={HomeScreen} options={{ 
          tabBarIcon: ({color}) => {
            return <Icon name="calculator" size={24} color={color}/>; 
          }, 
          }} 
        />
        <Tab.Screen name="Histórico" component={HistoryScreen} options={{
          tabBarIcon: ({color}) => {
            return <Icon name='history' size={24} color={color} />;
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
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator;