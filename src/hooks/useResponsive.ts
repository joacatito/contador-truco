import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const isLandscape = width > height;
    const isTablet = Math.min(width, height) >= 768;
    const isPhoneLandscape = isLandscape && !isTablet;
    const isPhonePortrait = !isLandscape && !isTablet;
    const maxContentWidth = isTablet ? 900 : 560;
    const sidePadding = isTablet ? 28 : isPhoneLandscape ? 14 : 16;

    return {
      width,
      height,
      isLandscape,
      isTablet,
      isPhoneLandscape,
      isPhonePortrait,
      maxContentWidth,
      sidePadding,
    };
  }, [height, width]);
}
