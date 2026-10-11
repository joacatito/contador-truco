import type { ManilhaType } from '@/types/game';

export function getScoreLimit(manilha: ManilhaType): number {
  return manilha === 'velha' ? 15 : 12;
}

export function getGameTitle(manilha: ManilhaType | null): string {
  return manilha === 'velha' ? 'Manilha Velha' : 'Truco Paulista';
}

export function getScoreButtons(manilha: ManilhaType | null): number[] {
  const buttons = [1, 3, 6, 9, 12];
  return manilha === 'velha' ? [...buttons, 15] : buttons;
}

export function sanitizeScore(value: string | number, maxScore: number): number {
  const parsed = typeof value === 'number' ? value : Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }

  return Math.min(parsed, maxScore);
}

export function applyScoreDelta(
  currentScore: number,
  delta: number,
  maxScore: number,
): number {
  return Math.min(currentScore + delta, maxScore);
}
