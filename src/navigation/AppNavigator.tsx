import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AboutScreen } from '@/screens/AboutScreen';
import { GameScreen } from '@/screens/GameScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { ManageTeamsScreen } from '@/screens/ManageTeamsScreen';
import { RulesScreen } from '@/screens/RulesScreen';
import { SelectManilhaScreen } from '@/screens/SelectManilhaScreen';
import { SelectTeamsScreen } from '@/screens/SelectTeamsScreen';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={AboutScreen} name="About" />
      <Stack.Screen component={RulesScreen} name="Rules" />
      <Stack.Screen component={SelectManilhaScreen} name="SelectManilha" />
      <Stack.Screen component={ManageTeamsScreen} name="ManageTeams" />
      <Stack.Screen component={SelectTeamsScreen} name="SelectTeams" />
      <Stack.Screen component={GameScreen} name="Game" />
    </Stack.Navigator>
  );
}
