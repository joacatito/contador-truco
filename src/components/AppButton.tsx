import React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, typography } from '../theme/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface Props {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
}

export const AppButton: React.FC<Props> = ({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
}) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
    >
      <Text style={[styles.label, variant === 'ghost' && styles.ghostLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  ghost: {
    borderWidth: 1,
    borderColor: colors.muted,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    minWidth: undefined,
  },
  label: {
    color: colors.buttonText,
    fontWeight: '700',
    fontSize: typography.body,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ghostLabel: {
    color: colors.textPrimary,
  },
  disabled: {
    opacity: 0.5,
  },
});
