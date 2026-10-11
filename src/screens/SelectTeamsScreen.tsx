import React, { useCallback, useState } from 'react';
import { ArrowRight } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { ActionButton } from '@/components/common/ActionButton';
import { PageScaffold } from '@/components/layout/PageScaffold';
import { RankingModal } from '@/components/ranking/RankingModal';
import { useResponsive } from '@/hooks/useResponsive';
import type { ScreenProps } from '@/navigation/types';
import { loadRanking, loadTeams, saveCurrentTeams } from '@/storage/gameStorage';
import { theme } from '@/theme';
import type { Team } from '@/types/game';
import { toRankingEntries } from '@/utils/ranking';
import {
  findTeamById,
  getInitialTeamSelection,
  selectTeamForSlot,
} from '@/utils/teamSelection';

function TeamOption({
  team,
  selected,
  onPress,
}: {
  team: Team;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <ActionButton
      label={team.name}
      onPress={onPress}
      style={selected ? styles.teamSelected : styles.teamIdle}
      variant={selected ? 'primary' : 'surface'}
    />
  );
}

export function SelectTeamsScreen({ navigation }: ScreenProps<'SelectTeams'>) {
  const { isTablet } = useResponsive();
  const [teams, setTeams] = useState<Team[]>([]);
  const [team1Id, setTeam1Id] = useState<string | null>(null);
  const [team2Id, setTeam2Id] = useState<string | null>(null);
  const [rankingVisible, setRankingVisible] = useState(false);
  const [rankingEntries, setRankingEntries] = useState(toRankingEntries({}));

  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function loadData() {
        const [savedTeams, savedRanking] = await Promise.all([loadTeams(), loadRanking()]);
        if (!active) {
          return;
        }

        setTeams(savedTeams);
        const initial = getInitialTeamSelection(savedTeams);
        setTeam1Id(initial.team1Id);
        setTeam2Id(initial.team2Id);
        setRankingEntries(toRankingEntries(savedRanking));
      }

      loadData();
      return () => {
        active = false;
      };
    }, []),
  );

  const team1 = findTeamById(teams, team1Id);
  const team2 = findTeamById(teams, team2Id);

  const teamOptions1 = teams.filter(team => team.id !== team2Id);
  const teamOptions2 = teams.filter(team => team.id !== team1Id);

  function handleSelectTeam1(selectedId: string) {
    const next = selectTeamForSlot(team1Id, team2Id, selectedId);
    setTeam1Id(next.nextCurrentSlotId);
    setTeam2Id(next.nextOppositeSlotId);
  }

  function handleSelectTeam2(selectedId: string) {
    const next = selectTeamForSlot(team2Id, team1Id, selectedId);
    setTeam2Id(next.nextCurrentSlotId);
    setTeam1Id(next.nextOppositeSlotId);
  }

  async function handleStart() {
    if (!team1 || !team2) {
      return;
    }

    await saveCurrentTeams(team1, team2);
    navigation.navigate('Game');
  }

  return (
    <>
      <PageScaffold
        onBack={() => navigation.goBack()}
        onRanking={() => setRankingVisible(true)}
        title="Selecionar Times">
        <Text style={styles.title}>Escolha os dois times que vão jogar:</Text>

        <View style={[styles.columns, !isTablet && styles.columnsStacked]}>
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Time 1</Text>
            <View style={styles.teamList}>
              {teamOptions1.map(team => (
                <TeamOption
                  key={`team1-${team.id}`}
                  onPress={() => handleSelectTeam1(team.id)}
                  selected={team1Id === team.id}
                  team={team}
                />
              ))}
            </View>
          </View>

          <View style={styles.column}>
            <Text style={styles.columnTitle}>Time 2</Text>
            <View style={styles.teamList}>
              {teamOptions2.map(team => (
                <TeamOption
                  key={`team2-${team.id}`}
                  onPress={() => handleSelectTeam2(team.id)}
                  selected={team2Id === team.id}
                  team={team}
                />
              ))}
            </View>
          </View>
        </View>

        <ActionButton
          disabled={!team1 || !team2}
          icon={ArrowRight}
          label="Iniciar Jogo"
          onPress={handleStart}
        />
      </PageScaffold>

      <RankingModal
        entries={rankingEntries}
        onClose={() => setRankingVisible(false)}
        visible={rankingVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  columns: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xxl,
  },
  columnsStacked: {
    flexDirection: 'column',
  },
  columnTitle: {
    color: theme.colors.gold,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  teamIdle: {
    minHeight: 56,
  },
  teamList: {
    gap: theme.spacing.sm,
  },
  teamSelected: {
    minHeight: 56,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
  },
});
