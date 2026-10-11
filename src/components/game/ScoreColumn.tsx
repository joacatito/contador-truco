import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { theme } from '@/theme';

interface ScoreColumnProps {
  teamName: string;
  score: number;
  maxScore: number;
  buttons: number[];
  onChangeScore: (value: string) => void;
  onAddPoints: (points: number) => void;
  compact?: boolean;
  reducedHeight?: boolean;
}

export function ScoreColumn({
  teamName,
  score,
  maxScore,
  buttons,
  onChangeScore,
  onAddPoints,
  compact = false,
  reducedHeight = false,
}: ScoreColumnProps) {
  return (
    <View
      style={[
        styles.card,
        compact && styles.cardCompact,
        reducedHeight && styles.cardReducedHeight,
      ]}>
      <Text
        numberOfLines={2}
        style={[
          styles.teamName,
          compact && styles.teamNameCompact,
          reducedHeight && styles.teamNameReducedHeight,
        ]}>
        {teamName}
      </Text>

      <View
        style={[
          styles.scoreWrap,
          compact && styles.scoreWrapCompact,
          reducedHeight && styles.scoreWrapReducedHeight,
        ]}>
        <Text
          style={[
            styles.label,
            compact && styles.labelCompact,
            reducedHeight && styles.labelReducedHeight,
          ]}>
          Pontos:
        </Text>
        <TextInput
          accessibilityLabel={`Pontos do ${teamName}`}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={onChangeScore}
          selectTextOnFocus
          style={[
            styles.input,
            compact && styles.inputCompact,
            reducedHeight && styles.inputReducedHeight,
          ]}
          value={String(score)}
        />
        <Text
          style={[
            styles.limit,
            compact && styles.limitCompact,
            reducedHeight && styles.limitReducedHeight,
          ]}>
          Máximo {maxScore}
        </Text>
      </View>

      <View style={styles.buttonGrid}>
        {buttons.map(points => (
          <Pressable
            key={`${teamName}-${points}`}
            accessibilityLabel={`Somar ${points} pontos para ${teamName}`}
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => onAddPoints(points)}
            style={({ pressed }) => [
              styles.pointButton,
              compact && styles.pointButtonCompact,
              reducedHeight && styles.pointButtonReducedHeight,
              pressed && styles.pointButtonPressed,
            ]}>
            <Text
              style={[
                styles.pointButtonText,
                compact && styles.pointButtonTextCompact,
                reducedHeight && styles.pointButtonTextReducedHeight,
              ]}>
              {`+${points}`}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    flex: 1,
    minHeight: 420,
    padding: theme.spacing.lg,
  },
  cardCompact: {
    minHeight: 0,
    padding: theme.spacing.md,
  },
  cardReducedHeight: {
    minHeight: 340,
  },
  input: {
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.lg,
    color: theme.colors.background,
    fontSize: 54,
    fontWeight: '800',
    minHeight: 124,
    minWidth: 124,
    paddingHorizontal: theme.spacing.md,
    textAlign: 'center',
  },
  inputCompact: {
    fontSize: 42,
    minHeight: 96,
    minWidth: 96,
  },
  inputReducedHeight: {
    fontSize: 36,
    minHeight: 82,
    minWidth: 82,
  },
  label: {
    color: theme.colors.white,
    fontSize: 20,
    marginBottom: theme.spacing.sm,
  },
  labelCompact: {
    fontSize: 18,
    marginBottom: theme.spacing.xs,
  },
  labelReducedHeight: {
    fontSize: 16,
    marginBottom: 2,
  },
  limit: {
    color: theme.colors.textSoft,
    fontSize: 14,
    marginTop: theme.spacing.sm,
  },
  limitCompact: {
    marginTop: theme.spacing.xs,
  },
  limitReducedHeight: {
    fontSize: 13,
    marginTop: 2,
  },
  pointButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.gold,
    borderRadius: theme.radius.md,
    flexBasis: '47%',
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: 58,
  },
  pointButtonCompact: {
    minHeight: 52,
  },
  pointButtonReducedHeight: {
    minHeight: 46,
  },
  pointButtonPressed: {
    opacity: 0.9,
  },
  pointButtonText: {
    color: theme.colors.background,
    fontSize: 22,
    fontWeight: '800',
  },
  pointButtonTextCompact: {
    fontSize: 20,
  },
  pointButtonTextReducedHeight: {
    fontSize: 18,
  },
  scoreWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
  },
  scoreWrapCompact: {
    paddingVertical: theme.spacing.md,
  },
  scoreWrapReducedHeight: {
    paddingVertical: theme.spacing.sm,
  },
  teamName: {
    color: theme.colors.gold,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  teamNameCompact: {
    fontSize: 22,
  },
  teamNameReducedHeight: {
    fontSize: 20,
  },
});
