import React from 'react';
import { Club, Info } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { ManilhaFan } from '@/components/cards/ManilhaFan';
import { ActionButton } from '@/components/common/ActionButton';
import { PageScaffold } from '@/components/layout/PageScaffold';
import { useResponsive } from '@/hooks/useResponsive';
import type { ScreenProps } from '@/navigation/types';
import { theme } from '@/theme';

export function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  const { isLandscape, isTablet, isPhoneLandscape } = useResponsive();

  return (
    <PageScaffold
      contentStyle={
        isLandscape && isTablet
          ? styles.contentLandscape
          : isPhoneLandscape
            ? styles.contentPhoneLandscape
            : undefined
      }>
      <View
        style={[
          styles.container,
          isLandscape && isTablet && styles.containerLandscape,
          isPhoneLandscape && styles.containerPhoneLandscape,
        ]}>
        <View
          style={[
            styles.hero,
            isLandscape && isTablet && styles.heroLandscape,
            isPhoneLandscape && styles.heroPhoneLandscape,
          ]}>
          <ManilhaFan />
          <Text
            accessibilityRole="header"
            style={[styles.title, isPhoneLandscape && styles.titlePhoneLandscape]}>
            Contador de Truco
          </Text>
          <Text style={[styles.subtitle, isPhoneLandscape && styles.subtitlePhoneLandscape]}>
            O melhor app para suas partidas!
          </Text>
          <Text style={[styles.extra, isPhoneLandscape && styles.extraPhoneLandscape]}>
            Jogue com seus amigos!
          </Text>
        </View>

        <View
          style={[
            styles.actions,
            isLandscape && isTablet && styles.actionsLandscape,
            isPhoneLandscape && styles.actionsPhoneLandscape,
          ]}>
          <ActionButton
            icon={Club}
            iconColor={theme.colors.black}
            iconFilled
            label="Novo Jogo"
            onPress={() => navigation.navigate('SelectManilha')}
          />
          <ActionButton
            icon={Info}
            label="Sobre"
            onPress={() => navigation.navigate('About')}
            variant="secondary"
          />
        </View>
      </View>
    </PageScaffold>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: theme.spacing.md,
    maxWidth: 720,
    width: '100%',
  },
  actionsLandscape: {
    maxWidth: 560,
  },
  actionsPhoneLandscape: {
    maxWidth: 520,
  },
  container: {
    alignItems: 'center',
  },
  containerLandscape: {
    flexDirection: 'row',
    gap: theme.spacing.xxxl,
    justifyContent: 'space-between',
  },
  contentLandscape: {
    maxWidth: 1080,
  },
  contentPhoneLandscape: {
    paddingBottom: theme.spacing.xxl,
  },
  extra: {
    color: theme.colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  extraPhoneLandscape: {
    fontSize: 16,
  },
  hero: {
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxxl,
  },
  heroLandscape: {
    flex: 1,
    marginBottom: 0,
  },
  heroPhoneLandscape: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  subtitle: {
    color: theme.colors.textSoft,
    fontSize: 24,
    textAlign: 'center',
  },
  subtitlePhoneLandscape: {
    fontSize: 18,
  },
  title: {
    color: theme.colors.gold,
    fontSize: 40,
    fontWeight: '900',
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  titlePhoneLandscape: {
    fontSize: 30,
    marginTop: theme.spacing.sm,
  },
  containerPhoneLandscape: {
    paddingTop: theme.spacing.sm,
  },
});
