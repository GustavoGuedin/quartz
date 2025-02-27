
import { useColorScheme } from 'react-native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import StackNavigator from './navigation/StackNavigator';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

      // first run
      useEffect(() => {
          if (AsyncStorage.getItem("@tile_size") == null) {
            AsyncStorage.setItem("@tile_size", "60x60")
            AsyncStorage.setItem("@line", "1")
            AsyncStorage.setItem("@shift", "A")
          }
      }, []);

  return (
    <PaperProvider theme={paperTheme}>
        <StackNavigator />
    </PaperProvider>
  );
}
