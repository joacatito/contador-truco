import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

const cards = [
  { label: '4♣️', subtitle: 'Zap' },
  { label: '7♥️', subtitle: 'Copas' },
  { label: 'A♠️', subtitle: 'Espadilha' },
  { label: '7♦️', subtitle: 'Pica-Fumo' },
];

export const ManilhaArtwork: React.FC = () => {
  return (
    <View style={styles.row}>
      {cards.map(card => (
        <View key={card.label} style={styles.card}>
          <Text style={styles.cardLabel}>{card.label}</Text>
          <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  card: {
    backgroundColor: '#F9F5EF',
    borderColor: colors.accent,
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  cardSubtitle: {
    marginTop: 4,
    color: '#555',
    fontWeight: '600',
  },
});
