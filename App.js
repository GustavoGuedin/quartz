
import { useColorScheme } from 'react-native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import StackNavigator from './navigation/StackNavigator';
import { SettingsProvider } from './contexts/SettingsContext';
import { DataProvider } from './contexts/DataContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  return (
    <DataProvider>
      <SettingsProvider>
        <PaperProvider theme={paperTheme}>
          <StackNavigator />
          <StatusBar style='auto' />
        </PaperProvider>
      </SettingsProvider>
    </DataProvider>
  );
}
