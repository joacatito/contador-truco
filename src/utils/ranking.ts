import type { RankingMap, Team } from '@/types/game';

export interface RankingEntry {
  id: string;
  name: string;
  wins: number;
}

export function incrementRanking(ranking: RankingMap, winner: Team): RankingMap {
  const next = { ...ranking };
  const current = next[winner.id];

  next[winner.id] = {
    name: winner.name,
    wins: current ? current.wins + 1 : 1,
  };

  return next;
}

export function toRankingEntries(ranking: RankingMap): RankingEntry[] {
  return Object.entries(ranking)
    .map(([id, value]) => ({
      id,
      name: value.name,
      wins: value.wins,
    }))
    .sort((left, right) => right.wins - left.wins || left.name.localeCompare(right.name));
}
