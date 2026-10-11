import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getBannerSpec } from '@/lib/ads';
import { theme } from '@/theme';

export function AdBannerPlaceholder() {
  const spec = getBannerSpec();

  return (
    <View style={styles.wrapper}>
      <View
        accessibilityLabel={spec.label}
        accessibilityRole="image"
        style={[styles.banner, { width: spec.width, height: spec.height }]}>
        <Text style={styles.label}>{spec.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    alignItems: 'center',
    backgroundColor: '#43524b',
    borderColor: '#6c7d74',
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    justifyContent: 'center',
  },
  label: {
    color: '#d0d7d3',
    fontSize: 13,
    fontWeight: '600',
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: theme.colors.banner,
    paddingBottom: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
  },
});
