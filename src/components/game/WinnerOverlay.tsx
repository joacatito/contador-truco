import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { Star, Trophy } from 'lucide-react-native';

import { theme } from '@/theme';

interface WinnerOverlayProps {
  visible: boolean;
  winnerName: string;
  onComplete: () => void;
}

const CONFETTI_COLORS = ['#ffd700', '#ff6b6b', '#4ecdc4', '#95e1d3', '#f38181'];

export function WinnerOverlay({
  visible,
  winnerName,
  onComplete,
}: WinnerOverlayProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const confetti = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${(index / 18) * 100}%` as `${number}%`,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        delay: (index % 6) * 110,
        translate: new Animated.Value(-40),
        rotate: new Animated.Value(0),
      })),
    [],
  );

  useEffect(() => {
    if (!visible) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      confetti.forEach(item => {
        item.translate.setValue(-40);
        item.rotate.setValue(0);
      });
      return;
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        duration: 320,
        easing: Easing.out(Easing.cubic),
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        damping: 12,
        stiffness: 120,
        toValue: 1,
        useNativeDriver: true,
      }),
      ...confetti.flatMap(item => [
        Animated.timing(item.translate, {
          delay: item.delay,
          duration: 2100,
          easing: Easing.in(Easing.quad),
          toValue: 620,
          useNativeDriver: true,
        }),
        Animated.timing(item.rotate, {
          delay: item.delay,
          duration: 2100,
          easing: Easing.linear,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [confetti, fadeAnim, onComplete, scaleAnim, visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
      {confetti.map(item => (
        <Animated.View
          key={item.id}
          style={[
            styles.confetti,
            {
              backgroundColor: item.color,
              left: item.left,
              transform: [
                { translateY: item.translate },
                {
                  rotate: item.rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '720deg'],
                  }),
                },
              ],
            },
          ]}
        />
      ))}

      <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.starsRow}>
          <Star color={theme.colors.gold} fill={theme.colors.gold} size={42} />
          <Star color={theme.colors.gold} fill={theme.colors.gold} size={60} />
          <Star color={theme.colors.gold} fill={theme.colors.gold} size={42} />
        </View>

        <Trophy color={theme.colors.gold} size={120} strokeWidth={2.2} />
        <Text style={styles.title}>Fim de Jogo!</Text>

        <View style={styles.winnerCard}>
          <Text style={styles.winnerLabel}>Vencedor:</Text>
          <Text style={styles.winnerName}>{winnerName}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  confetti: {
    borderRadius: 4,
    height: 14,
    position: 'absolute',
    top: -12,
    width: 10,
  },
  content: {
    alignItems: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  starsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.lg,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
  },
  winnerCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.gold,
    borderRadius: theme.radius.lg,
    maxWidth: 440,
    minWidth: 260,
    paddingHorizontal: theme.spacing.xxxl,
    paddingVertical: theme.spacing.xxl,
  },
  winnerLabel: {
    color: theme.colors.background,
    fontSize: 24,
    marginBottom: theme.spacing.sm,
  },
  winnerName: {
    color: theme.colors.background,
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
});
