import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

import { AD_UNITS } from '@/lib/adUnits';
import { theme } from '@/theme';

export function AdBanner() {
  return (
    <View style={styles.wrapper}>
      <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId={AD_UNITS.banner} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: theme.colors.banner,
  },
});
