import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { theme } from '@/theme';

interface ActionButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: LucideIcon;
  iconColor?: string;
  iconFilled?: boolean;
  variant?: 'primary' | 'secondary' | 'surface';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function ActionButton({
  label,
  onPress,
  icon: Icon,
  iconColor,
  iconFilled = false,
  variant = 'primary',
  disabled = false,
  style,
  accessibilityLabel,
}: ActionButtonProps) {
  const variantStyle =
    variant === 'secondary'
      ? styles.secondary
      : variant === 'surface'
        ? styles.surface
        : styles.primary;

  const textStyle =
    variant === 'primary' ? styles.primaryText : styles.secondaryText;
  const resolvedIconColor = iconColor ?? textStyle.color;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      <View style={styles.content}>
        {Icon ? (
          <Icon
            color={resolvedIconColor}
            fill={iconFilled ? resolvedIconColor : 'none'}
            size={24}
            strokeWidth={2.4}
          />
        ) : null}
        <Text style={[styles.label, textStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.lg,
    minHeight: 58,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#70857a',
    opacity: 0.7,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  primary: {
    backgroundColor: theme.colors.gold,
  },
  primaryText: {
    color: theme.colors.background,
  },
  secondary: {
    backgroundColor: theme.colors.goldSecondary,
  },
  secondaryText: {
    color: theme.colors.white,
  },
  surface: {
    backgroundColor: theme.colors.surface,
  },
});
