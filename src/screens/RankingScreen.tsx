import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme/colors';
import { useGame } from '../context/GameContext';
import { AppButton } from '../components/AppButton';
import { BannerAd } from '../components/BannerAd';
import { RootStackParamList } from '../navigation/AppNavigator';

export const RankingScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { ranking } = useGame();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Ranking dos ganhadores</Text>
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {ranking.map((team, index) => (
            <View key={team.id} style={styles.row}>
              <Text style={styles.position}>{index + 1}º</Text>
              <View style={styles.rowContent}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.wins}>{team.wins} vitórias</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.flexSpacer} />
          <AppButton label="Voltar" variant="ghost" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.bannerWrapper}>
          <BannerAd label="Banner - Ranking" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.screenPadding,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: '700',
    marginBottom: 12,
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.card,
  },
  position: {
    color: colors.accent,
    fontSize: typography.subtitle,
    fontWeight: '700',
  },
  rowContent: {
    flex: 1,
  },
  teamName: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: '700',
  },
  wins: {
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  flexSpacer: {
    flex: 1,
  },
  bannerWrapper: {
    marginTop: 12,
  },
});
