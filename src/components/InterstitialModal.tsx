import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useInterstitials } from '../context/InterstitialContext';
import { colors, typography } from '../theme/colors';

export const InterstitialModal: React.FC = () => {
  const { isVisible, hideInterstitial, currentMessage } = useInterstitials();

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Publicidade</Text>
          <Text style={styles.message}>{currentMessage}</Text>
          <TouchableOpacity style={styles.button} onPress={hideInterstitial}>
            <Text style={styles.buttonLabel}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.accent,
    width: '100%',
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: '700',
    marginBottom: 16,
  },
  message: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    paddingVertical: 12,
  },
  buttonLabel: {
    color: colors.buttonText,
    fontSize: typography.body,
    textAlign: 'center',
    fontWeight: '700',
  },
});
