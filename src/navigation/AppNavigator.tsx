import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { colors } from '../theme/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { RulesScreen } from '../screens/RulesScreen';
import { ManilhaInfoScreen } from '../screens/ManilhaInfoScreen';
import { ManilhaSelectionScreen } from '../screens/ManilhaSelectionScreen';
import { TeamSetupScreen } from '../screens/TeamSetupScreen';
import { TeamSelectionScreen } from '../screens/TeamSelectionScreen';
import { ScoreboardScreen } from '../screens/ScoreboardScreen';
import { RankingScreen } from '../screens/RankingScreen';
import { ManilhaVariant } from '../constants/manilhas';

enableScreens();

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Rules: undefined;
  ManilhaInfo: { variant: ManilhaVariant };
  ManilhaSelection: undefined;
  TeamSetup: undefined;
  TeamSelection: undefined;
  Scoreboard: undefined;
  Ranking: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.textPrimary,
    border: 'transparent',
    primary: colors.accent,
  },
};

export const AppNavigator = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
        <Stack.Screen name="ManilhaInfo" component={ManilhaInfoScreen} />
        <Stack.Screen name="ManilhaSelection" component={ManilhaSelectionScreen} />
        <Stack.Screen name="TeamSetup" component={TeamSetupScreen} />
        <Stack.Screen name="TeamSelection" component={TeamSelectionScreen} />
        <Stack.Screen name="Scoreboard" component={ScoreboardScreen} />
        <Stack.Screen
          name="Ranking"
          component={RankingScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
