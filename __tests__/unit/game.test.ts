import {
  applyScoreDelta,
  getGameTitle,
  getScoreButtons,
  getScoreLimit,
  sanitizeScore,
} from '@/utils/game';
import { shouldShowInterstitialOnScoreAction } from '@/lib/ads';

describe('game utils', () => {
  it('returns the correct limit for each manilha', () => {
    expect(getScoreLimit('velha')).toBe(15);
    expect(getScoreLimit('paulista')).toBe(12);
  });

  it('caps score changes at the game limit', () => {
    expect(sanitizeScore('17', 15)).toBe(15);
    expect(sanitizeScore('-1', 12)).toBe(0);
    expect(applyScoreDelta(10, 6, 12)).toBe(12);
  });

  it('returns the expected score buttons and title', () => {
    expect(getScoreButtons('paulista')).toEqual([1, 3, 6, 9, 12]);
    expect(getScoreButtons('velha')).toEqual([1, 3, 6, 9, 12, 15]);
    expect(getGameTitle('velha')).toBe('Manilha Velha');
    expect(getGameTitle('paulista')).toBe('Truco Paulista');
  });

  it('never allows more than 3 score actions without interstitial', () => {
    expect(shouldShowInterstitialOnScoreAction(1, 0.9)).toBe(false);
    expect(shouldShowInterstitialOnScoreAction(2, 0.9)).toBe(false);
    expect(shouldShowInterstitialOnScoreAction(3, 0.9)).toBe(true);
  });
});
