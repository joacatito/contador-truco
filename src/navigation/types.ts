import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Rules: undefined;
  SelectManilha: undefined;
  ManageTeams: undefined;
  SelectTeams: undefined;
  Game: undefined;
};

export type ScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;
