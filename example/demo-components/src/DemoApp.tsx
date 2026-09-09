import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DemoScreen } from './DemoScreen';

LogBox.ignoreAllLogs();

export function DemoApp() {
  const isDark = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          translucent
          {...(isDark
            ? {
                backgroundColor: 'black',
                barStyle: 'light-content',
              }
            : {
                backgroundColor: 'white',
                barStyle: 'dark-content',
              })}
        />
        <DemoScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
