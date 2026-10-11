import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { X } from 'lucide-react-native';

import { theme } from '@/theme';

interface EditableTeamRowProps {
  value: string;
  onChangeText: (value: string) => void;
  onRemove?: () => void;
  removable: boolean;
}

export function EditableTeamRow({
  value,
  onChangeText,
  onRemove,
  removable,
}: EditableTeamRowProps) {
  return (
    <View style={styles.row}>
      <TextInput
        accessibilityLabel={`Nome do ${value || 'time'}`}
        autoCapitalize="words"
        onChangeText={onChangeText}
        placeholder="Nome do time"
        placeholderTextColor="#5d7868"
        style={styles.input}
        value={value}
      />
      {removable && onRemove ? (
        <Pressable
          accessibilityLabel={`Remover ${value}`}
          accessibilityRole="button"
          hitSlop={8}
          onPress={onRemove}
          style={({ pressed }) => [styles.removeButton, pressed && styles.removePressed]}>
          <X color={theme.colors.white} size={18} strokeWidth={2.8} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.md,
    color: theme.colors.background,
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    minHeight: 54,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.danger,
    borderRadius: theme.radius.md,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  removePressed: {
    opacity: 0.88,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
});
