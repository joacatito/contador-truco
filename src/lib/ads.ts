export interface BannerSpec {
  width: number;
  height: number;
  label: string;
}

export function getBannerSpec(): BannerSpec {
  return {
    width: 320,
    height: 50,
    label: 'Espaço para Banner 320x50',
  };
}

export function shouldShowInterstitialOnGameOpen(randomValue = Math.random()): boolean {
  return randomValue < 0.2;
}

export function shouldShowInterstitialOnScoreAction(
  clickCount: number,
  randomValue = Math.random(),
): boolean {
  if (clickCount >= 3) {
    return true;
  }

  return clickCount >= 1 && randomValue < 0.3;
}
