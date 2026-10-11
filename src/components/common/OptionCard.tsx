import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme';

interface OptionCardProps {
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
}

export function OptionCard({
  title,
  subtitle,
  selected,
  onPress,
}: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected ? styles.cardSelected : styles.cardIdle,
        pressed && styles.cardPressed,
      ]}>
      <View>
        <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
        <Text style={[styles.subtitle, selected && styles.subtitleSelected]}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    minHeight: 112,
    padding: theme.spacing.xl,
  },
  cardIdle: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  cardPressed: {
    opacity: 0.92,
  },
  cardSelected: {
    backgroundColor: theme.colors.gold,
    borderColor: '#ffef74',
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 18,
    marginTop: theme.spacing.xs,
  },
  subtitleSelected: {
    color: theme.colors.background,
  },
  title: {
    color: theme.colors.white,
    fontSize: 26,
    fontWeight: '800',
  },
  titleSelected: {
    color: theme.colors.background,
  },
});
