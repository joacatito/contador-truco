import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { BannerAd } from '../components/BannerAd';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useGame } from '../context/GameContext';
import { colors, spacing, typography } from '../theme/colors';

const options = [
  { label: 'Manilha Velha', value: 'velha' },
  { label: 'Manilha Nova', value: 'nova' },
] as const;

export const ManilhaSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { manilhaType, setManilhaType } = useGame();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Qual a manilha da mesa?</Text>
          <Text style={styles.subtitle}>
            Escolha o estilo antes de iniciar o jogo. A qualquer momento dá para voltar aqui e trocar.
          </Text>
          <View style={styles.optionsRow}>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionCard, manilhaType === option.value && styles.optionCardActive]}
                onPress={() => {
                  setManilhaType(option.value);
                  navigation.navigate('TeamSetup');
                }}
              >
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.links}>
            <Text style={styles.linksTitle}>Ficou na dúvida?</Text>
            <View style={styles.linksRow}>
              <AppButton
                label="Manilha Velha"
                variant="ghost"
                onPress={() => navigation.navigate('ManilhaInfo', { variant: 'velha' })}
              />
              <AppButton
                label="Nova com 4,5,6,7"
                variant="ghost"
                onPress={() => navigation.navigate('ManilhaInfo', { variant: 'nova_composta' })}
              />
              <AppButton
                label="Nova sem 4,5,6,7"
                variant="ghost"
                onPress={() => navigation.navigate('ManilhaInfo', { variant: 'nova_limpa' })}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <View style={styles.flexSpacer} />
            <AppButton label="Voltar" variant="ghost" onPress={() => navigation.navigate('Home')} />
          </View>
          <BannerAd label="Banner - Config" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.screenPadding,
  },
  content: {
    flex: 1,
    gap: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  optionCard: {
    flex: 1,
    minHeight: 120,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.accentDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.card,
  },
  optionCardActive: {
    borderColor: colors.accent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  optionLabel: {
    color: colors.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: '700',
  },
  links: {
    marginTop: 12,
    gap: 8,
  },
  linksTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  linksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  footer: {
    gap: 12,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flexSpacer: {
    flex: 1,
  },
});
