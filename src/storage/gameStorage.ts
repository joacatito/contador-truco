import { STORAGE_KEYS } from '@/constants/storage';
import type { ManilhaType, RankingMap, Team } from '@/types/game';
import { createDefaultTeams } from '@/utils/teamSelection';

import { readJson, readString, writeJson, writeString } from './appStorage';

export async function loadTeams(): Promise<Team[]> {
  const teams = await readJson<Team[]>(STORAGE_KEYS.teams, []);
  if (teams.length >= 2) {
    return teams;
  }

  const defaults = createDefaultTeams();
  await saveTeams(defaults);
  return defaults;
}

export async function saveTeams(teams: Team[]): Promise<void> {
  await writeJson(STORAGE_KEYS.teams, teams);
}

export async function loadGameManilha(): Promise<ManilhaType | null> {
  const value = await readString(STORAGE_KEYS.gameManilha);
  return value === 'velha' || value === 'paulista' ? value : null;
}

export async function saveGameManilha(manilha: ManilhaType): Promise<void> {
  await writeString(STORAGE_KEYS.gameManilha, manilha);
}

export async function loadCurrentTeams(): Promise<{
  team1: Team | null;
  team2: Team | null;
}> {
  const [team1, team2] = await Promise.all([
    readJson<Team | null>(STORAGE_KEYS.currentTeam1, null),
    readJson<Team | null>(STORAGE_KEYS.currentTeam2, null),
  ]);

  return { team1, team2 };
}

export async function saveCurrentTeams(team1: Team, team2: Team): Promise<void> {
  await Promise.all([
    writeJson(STORAGE_KEYS.currentTeam1, team1),
    writeJson(STORAGE_KEYS.currentTeam2, team2),
  ]);
}

export async function loadRanking(): Promise<RankingMap> {
  return readJson<RankingMap>(STORAGE_KEYS.ranking, {});
}

export async function saveRanking(ranking: RankingMap): Promise<void> {
  await writeJson(STORAGE_KEYS.ranking, ranking);
}
