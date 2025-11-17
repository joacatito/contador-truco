import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme/colors';
import { useGame } from '../context/GameContext';
import { AppButton } from '../components/AppButton';
import { BannerAd } from '../components/BannerAd';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useInterstitials } from '../context/InterstitialContext';

export const ScoreboardScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    selectedTeamsData,
    scores,
    incrementScore,
    setScore,
    manilhaType,
    winningScore,
    registerWin,
    resetSelectedScores,
  } = useGame();
  const { registerPointClick, registerGameStart, registerGameFinished, hideInterstitial } =
    useInterstitials();
  const winnerRef = useRef<string | null>(null);
  const skipNextWinCheckRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      hideInterstitial();
      skipNextWinCheckRef.current = true;
      resetSelectedScores();
      winnerRef.current = null;
      registerGameStart();
      return () => hideInterstitial();
    }, [resetSelectedScores, registerGameStart, hideInterstitial]),
  );

  const participants = useMemo(() => [selectedTeamsData.first, selectedTeamsData.second], [selectedTeamsData]);

  useEffect(() => {
    if (skipNextWinCheckRef.current) {
      skipNextWinCheckRef.current = false;
      return;
    }

    participants.forEach(team => {
      if (!team) {
        return;
      }
      const score = scores[team.id] ?? 0;
      if (score >= winningScore && winnerRef.current !== team.id) {
        winnerRef.current = team.id;
        registerWin(team.id);
        registerGameFinished();
        Alert.alert('Fim de jogo', `${team.name} bateu ${winningScore} pontos!`, [
          {
            text: 'Beleza',
            onPress: () => navigation.navigate('TeamSelection'),
          },
        ]);
      }
    });
  }, [participants, scores, winningScore, navigation, registerWin, registerGameFinished]);

  if (!participants[0] || !participants[1] || !manilhaType) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Selecione os times antes de marcar pontos.</Text>
          <AppButton label="Voltar" onPress={() => navigation.navigate('TeamSelection')} />
        </View>
      </SafeAreaView>
    );
  }

  const increments = manilhaType === 'velha' ? [1, 3, 6, 9, 12, 15] : [1, 3, 6, 9, 12];

  const handleManualScore = (teamId: string, value: string) => {
    const numeric = parseInt(value.replace(/[^0-9]/g, ''), 10);
    setScore(teamId, Number.isNaN(numeric) ? 0 : numeric);
  };

  const renderTeamColumn = (teamIndex: 0 | 1) => {
    const team = participants[teamIndex]!;
    const teamScore = scores[team.id] ?? 0;

    return (
      <View key={team.id} style={styles.teamColumn}>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.pointsLabel}>Pontos</Text>
        <TextInput
          style={styles.scoreInput}
          value={String(teamScore)}
          keyboardType="number-pad"
          onChangeText={value => handleManualScore(team.id, value)}
        />
        <View style={styles.incrementRow}>
          {increments.map(value => (
            <AppButton
              key={`${team.id}-${value}`}
              label={`+${value}`}
              style={styles.incrementButton}
              onPress={() => {
                incrementScore(team.id, value);
                registerPointClick();
              }}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Até {winningScore} pontos</Text>
          <Text style={styles.subtitle}>Alterou o número? Já salvamos. Não tem botão escondido.</Text>
          <View style={styles.columns}>{renderTeamColumn(0)}{renderTeamColumn(1)}</View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <AppButton label="Ranking" variant="secondary" onPress={() => navigation.navigate('Ranking')} />
            <View style={styles.flexSpacer} />
            <AppButton label="Voltar" variant="ghost" onPress={() => navigation.navigate('TeamSelection')} />
          </View>
          <BannerAd label="Banner - Placar" />
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
    gap: 12,
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
    marginBottom: 15,
  },
  teamColumn: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: colors.accent,
    gap: 12,
  },
  teamName: {
    color: colors.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: '700',
  },
  pointsLabel: {
    color: colors.muted,
    fontSize: typography.small,
  },
  scoreInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    color: colors.textPrimary,
    fontSize: 32,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.accentDark,
  },
  incrementRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  incrementButton: {
    minWidth: 72,
  },
  footer: {
    gap: 12,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flexSpacer: {
    flex: 1,
  },
});
