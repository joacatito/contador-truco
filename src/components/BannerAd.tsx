import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ADS_IDS } from '../config/ads';
import { colors, typography } from '../theme/colors';

interface Props {
  label?: string;
}

export const BannerAd: React.FC<Props> = ({ label = 'Banner' }) => {
  const ids = Platform.select({
    ios: ADS_IDS.test.ios.banner,
    android: ADS_IDS.test.android.banner,
    default: 'TEST_BANNER_ID',
  });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.subtitle}>ID de teste: {ids}</Text>
      <Text style={styles.subtitle}>Troque por ID "valendo" em src/config/ads.ts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.bannerBackground,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.accentDark,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.small,
    textAlign: 'center',
  },
});
