import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { GameProvider } from './src/context/GameContext';
import { InterstitialProvider } from './src/context/InterstitialContext';
import { InterstitialModal } from './src/components/InterstitialModal';
import { colors } from './src/theme/colors';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <InterstitialProvider>
          <StatusBar barStyle="light-content" backgroundColor={colors.background} />
          <AppNavigator />
          <InterstitialModal />
        </InterstitialProvider>
      </GameProvider>
    </SafeAreaProvider>
  );
}

export default App;
