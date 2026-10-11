import React, { useCallback, useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { ActionButton } from '@/components/common/ActionButton';
import { PageScaffold } from '@/components/layout/PageScaffold';
import { EditableTeamRow } from '@/components/team/EditableTeamRow';
import type { ScreenProps } from '@/navigation/types';
import { loadTeams, saveTeams } from '@/storage/gameStorage';
import { theme } from '@/theme';
import type { Team } from '@/types/game';
import { createNewTeam } from '@/utils/teamSelection';

export function ManageTeamsScreen({ navigation }: ScreenProps<'ManageTeams'>) {
  const [teams, setTeams] = useState<Team[]>([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      loadTeams().then(savedTeams => {
        if (active) {
          setTeams(savedTeams);
        }
      });

      return () => {
        active = false;
      };
    }, []),
  );

  async function persist(nextTeams: Team[]) {
    setTeams(nextTeams);
    await saveTeams(nextTeams);
  }

  async function handleAddTeam() {
    await persist([...teams, createNewTeam(teams)]);
  }

  async function handleChangeName(teamId: string, value: string) {
    await persist(teams.map(team => (team.id === teamId ? { ...team, name: value } : team)));
  }

  async function handleRemove(teamId: string) {
    if (teams.length <= 2) {
      return;
    }

    await persist(teams.filter(team => team.id !== teamId));
  }

  return (
    <PageScaffold onBack={() => navigation.goBack()} title="Gerenciar Times">
      <Text style={styles.title}>Cadastre seus times ou duplas:</Text>

      <View style={styles.list}>
        {teams.map(team => (
          <EditableTeamRow
            key={team.id}
            onChangeText={value => handleChangeName(team.id, value)}
            onRemove={() => handleRemove(team.id)}
            removable={teams.length > 2}
            value={team.name}
          />
        ))}
      </View>

      <ActionButton
        icon={Plus}
        label="Adicionar Time"
        onPress={handleAddTeam}
        variant="surface"
      />

      <View style={styles.note}>
        <Text style={styles.noteText}>
          Chamamos de "times" pois podem ser duplas ou trios. Cadastre todos os times que
          costumam jogar juntos e, na próxima tela, escolha quais dois vão para a partida.
        </Text>
      </View>

      <ActionButton
        icon={ArrowRight}
        label="Próximo"
        onPress={() => navigation.navigate('SelectTeams')}
      />
    </PageScaffold>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  note: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    marginVertical: theme.spacing.xl,
    padding: theme.spacing.lg,
  },
  noteText: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
});
