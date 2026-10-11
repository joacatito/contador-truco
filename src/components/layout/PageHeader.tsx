import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft, Trophy } from 'lucide-react-native';

import { theme } from '@/theme';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  onRanking?: () => void;
  topInset?: number;
}

export function PageHeader({
  title,
  onBack,
  onRanking,
  topInset = 0,
}: PageHeaderProps) {
  return (
    <View style={[styles.container, { paddingTop: topInset + theme.spacing.sm }]}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable
            accessibilityLabel="Voltar"
            accessibilityRole="button"
            hitSlop={8}
            onPress={onBack}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <ArrowLeft color={theme.colors.gold} size={24} strokeWidth={2.6} />
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <Text accessibilityRole="header" numberOfLines={1} style={styles.title}>
        {title}
      </Text>

      <View style={[styles.side, styles.sideRight]}>
        {onRanking ? (
          <Pressable
            accessibilityLabel="Abrir ranking"
            accessibilityRole="button"
            hitSlop={8}
            onPress={onRanking}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <Trophy color={theme.colors.gold} size={24} strokeWidth={2.4} />
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 72,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: theme.radius.md,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  pressed: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  placeholder: {
    height: 44,
    width: 44,
  },
  side: {
    alignItems: 'flex-start',
    width: 52,
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  title: {
    color: theme.colors.gold,
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
});
