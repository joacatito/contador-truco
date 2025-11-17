import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../theme/colors';
import { AppButton } from '../components/AppButton';
import { ManilhaArtwork } from '../components/ManilhaArtwork';
import { BannerAd } from '../components/BannerAd';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Contador de Truco</Text>
          <Text style={styles.subtitle}>
            Simples como mesa de bar: marque os pontos, escolha a manilha e acompanhe os campeões da noite.
          </Text>
          <View style={styles.artworkWrapper}>
            <ManilhaArtwork />
          </View>
          <View style={styles.actions}>
            <AppButton label="Novo Jogo" onPress={() => navigation.navigate('ManilhaSelection')} />
            <AppButton label="Sobre" variant="secondary" onPress={() => navigation.navigate('About')} />
          </View>
        </View>
        <View style={styles.footer}>
          <BannerAd label="Banner - Home" />
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
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 36,
    color: colors.textPrimary,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    textAlign: 'center',
    lineHeight: 22,
  },
  artworkWrapper: {
    marginVertical: 24,
    alignItems: 'center',
  },
  actions: {
    alignItems: 'center',
    gap: 16,
  },
  footer: {
    marginTop: 32,
  },
});
