import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Trophy, X } from 'lucide-react-native';

import type { RankingEntry } from '@/utils/ranking';
import { theme } from '@/theme';

interface RankingModalProps {
  visible: boolean;
  entries: RankingEntry[];
  onClose: () => void;
}

export function RankingModal({ visible, entries, onClose }: RankingModalProps) {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerTitleWrap}>
              <Trophy color={theme.colors.gold} size={28} strokeWidth={2.4} />
              <Text style={styles.headerTitle}>Ranking</Text>
            </View>
            <Pressable
              accessibilityLabel="Fechar ranking"
              accessibilityRole="button"
              hitSlop={8}
              onPress={onClose}
              style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
              <X color={theme.colors.white} size={22} strokeWidth={2.5} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.listContent}>
            {entries.length === 0 ? (
              <Text style={styles.empty}>Nenhuma partida jogada ainda.</Text>
            ) : (
              entries.map((entry, index) => (
                <View
                  key={entry.id}
                  style={[styles.entryCard, index === 0 ? styles.entryGold : styles.entryRegular]}>
                  <Text style={[styles.position, index === 0 && styles.positionGold]}>
                    {index + 1}º
                  </Text>
                  <View style={styles.entryMain}>
                    <Text style={[styles.entryName, index === 0 && styles.entryNameGold]}>
                      {entry.name}
                    </Text>
                  </View>
                  <Text style={[styles.entryWins, index === 0 && styles.entryNameGold]}>
                    {entry.wins} {entry.wins === 1 ? 'vitória' : 'vitórias'}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>

          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            onPress={onClose}
            style={({ pressed }) => [styles.footerButton, pressed && styles.pressed]}>
            <Text style={styles.footerButtonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: theme.colors.backdrop,
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.gold,
    borderRadius: theme.radius.lg,
    borderWidth: 3,
    maxHeight: '80%',
    maxWidth: 560,
    paddingBottom: theme.spacing.lg,
    width: '100%',
  },
  closeButton: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
  },
  empty: {
    color: theme.colors.white,
    fontSize: 18,
    paddingVertical: theme.spacing.xxxl,
    textAlign: 'center',
  },
  entryCard: {
    alignItems: 'center',
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  entryGold: {
    backgroundColor: theme.colors.gold,
  },
  entryMain: {
    flex: 1,
  },
  entryName: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  entryNameGold: {
    color: theme.colors.background,
  },
  entryRegular: {
    backgroundColor: theme.colors.surface,
  },
  entryWins: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  footerButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: theme.colors.gold,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    minHeight: 52,
  },
  footerButtonText: {
    color: theme.colors.background,
    fontSize: 20,
    fontWeight: '800',
  },
  header: {
    alignItems: 'center',
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
  },
  headerTitle: {
    color: theme.colors.gold,
    fontSize: 28,
    fontWeight: '800',
  },
  headerTitleWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  listContent: {
    gap: theme.spacing.sm,
    padding: theme.spacing.lg,
  },
  position: {
    color: theme.colors.gold,
    fontSize: 24,
    fontWeight: '800',
    minWidth: 42,
    textAlign: 'center',
  },
  positionGold: {
    color: theme.colors.background,
  },
  pressed: {
    opacity: 0.9,
  },
});
