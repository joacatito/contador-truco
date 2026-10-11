import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { X } from 'lucide-react-native';

import { theme } from '@/theme';

interface InterstitialAdModalProps {
  visible: boolean;
  onClose: () => void;
}

export function InterstitialAdModal({
  visible,
  onClose,
}: InterstitialAdModalProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!visible) {
      setCountdown(3);
      return;
    }

    if (countdown === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(current => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, visible]);

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {countdown === 0 ? (
            <Pressable
              accessibilityLabel="Fechar anúncio"
              accessibilityRole="button"
              hitSlop={8}
              onPress={onClose}
              style={({ pressed }) => [styles.closeButton, pressed && styles.closePressed]}>
              <X color="#1f2421" size={22} strokeWidth={2.6} />
            </Pressable>
          ) : null}

          <Text style={styles.emoji}>📺</Text>
          <Text style={styles.title}>Anúncio Interstitial</Text>
          <Text style={styles.subtitle}>
            {countdown > 0 ? `Fechando em ${countdown}s...` : 'Toque no X para fechar'}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  card: {
    alignItems: 'center',
    aspectRatio: 1.6,
    backgroundColor: '#262d29',
    borderColor: '#616d68',
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    justifyContent: 'center',
    maxWidth: 760,
    padding: theme.spacing.xxxl,
    width: '100%',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.pill,
    height: 42,
    justifyContent: 'center',
    position: 'absolute',
    right: theme.spacing.lg,
    top: theme.spacing.lg,
    width: 42,
  },
  closePressed: {
    opacity: 0.85,
  },
  emoji: {
    fontSize: 58,
    marginBottom: theme.spacing.lg,
  },
  subtitle: {
    color: '#c4cbc7',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
});
