export type ManilhaType = 'velha' | 'paulista';

export interface Team {
  id: string;
  name: string;
}

export interface RankingItem {
  name: string;
  wins: number;
}

export type RankingMap = Record<string, RankingItem>;
