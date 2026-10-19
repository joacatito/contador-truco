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
