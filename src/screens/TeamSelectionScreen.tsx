import React, { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme/colors';
import { useGame } from '../context/GameContext';
import { AppButton } from '../components/AppButton';
import { BannerAd } from '../components/BannerAd';
import { RootStackParamList } from '../navigation/AppNavigator';

export const TeamSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { teams, selected, selectTeam } = useGame();

  const availableFirst = useMemo(
    () => teams.filter(team => team.id !== selected.second),
    [teams, selected.second],
  );
  const availableSecond = useMemo(
    () => teams.filter(team => team.id !== selected.first),
    [teams, selected.first],
  );

  const toggleTeam = (slot: 'first' | 'second', teamId: string) => {
    if (selected[slot] === teamId) {
      selectTeam(slot, undefined);
    } else {
      selectTeam(slot, teamId);
    }
  };

  const ready = Boolean(selected.first && selected.second && selected.first !== selected.second);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Quem entra em campo?</Text>
          <Text style={styles.subtitle}>
            Toque para escolher e toque novamente para tirar. Assim que um time é escolhido em uma coluna ele some da outra.
          </Text>
          <View style={styles.columns}>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Time A</Text>
              <ScrollView contentContainerStyle={styles.columnContent} showsVerticalScrollIndicator={false}>
                {availableFirst.map(team => (
                  <TouchableOpacity
                    key={team.id}
                    style={[styles.teamChip, selected.first === team.id && styles.teamChipActive]}
                    onPress={() => toggleTeam('first', team.id)}
                  >
                    <Text style={styles.teamName}>{team.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Time B</Text>
              <ScrollView contentContainerStyle={styles.columnContent} showsVerticalScrollIndicator={false}>
                {availableSecond.map(team => (
                  <TouchableOpacity
                    key={team.id}
                    style={[styles.teamChip, selected.second === team.id && styles.teamChipActive]}
                    onPress={() => toggleTeam('second', team.id)}
                  >
                    <Text style={styles.teamName}>{team.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.primaryActionRow}>
            <AppButton
              label="Iniciar Jogo"
              variant="secondary"
              disabled={!ready}
              style={styles.primaryActionButton}
              onPress={() => navigation.navigate('Scoreboard')}
            />
          </View>
          <View style={styles.footerButtons}>
            <AppButton label="Ranking" variant="secondary" onPress={() => navigation.navigate('Ranking')} />
            <View style={styles.flexSpacer} />
            <AppButton label="Voltar" variant="ghost" onPress={() => navigation.navigate('TeamSetup')} />
          </View>
          <BannerAd label="Banner - Seleção" />
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
  content: {
    flex: 1,
    gap: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    lineHeight: 22,
  },
  columns: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  column: {
    flex: 1,
  },
  columnContent: {
    paddingBottom: 16,
  },
  columnTitle: {
    color: colors.muted,
    fontSize: typography.subtitle,
    marginBottom: 4,
  },
  teamChip: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.accentDark,
    marginBottom: 8,
  },
  teamChipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentDark,
  },
  teamName: {
    color: colors.textPrimary,
    fontSize: typography.body,
  },
  footer: {
    gap: 12,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  flexSpacer: {
    flex: 1,
  },
  primaryActionRow: {
    alignItems: 'center',
  },
  primaryActionButton: {
    minWidth: 220,
  },
});
