import React from 'react';
import { BookOpen } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/common/ActionButton';
import { PageScaffold } from '@/components/layout/PageScaffold';
import type { ScreenProps } from '@/navigation/types';
import { theme } from '@/theme';

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function AboutScreen({ navigation }: ScreenProps<'About'>) {
  return (
    <PageScaffold onBack={() => navigation.goBack()} title="Sobre">
      <InfoSection title="Sobre o App">
        <Text style={styles.body}>
          O Contador de Truco é um aplicativo simples e prático para você e seus amigos
          contarem os pontos durante as partidas de truco. Desenvolvido pensando na
          simplicidade e facilidade de uso, perfeito para usar no boteco!
        </Text>
      </InfoSection>

      <InfoSection title="O que é Truco?">
        <Text style={styles.body}>
          O Truco é um dos jogos de cartas mais populares do Brasil. Jogado com baralho
          espanhol ou comum sem 8, 9 e 10, o jogo combina estratégia, blefe e muita
          diversão entre amigos.
        </Text>
        <Text style={styles.body}>
          O objetivo é fazer pontos vencendo as rodadas e ser o primeiro a chegar a 12
          pontos ou 15 na manilha velha.
        </Text>
      </InfoSection>

      <InfoSection title="História do Truco">
        <Text style={styles.body}>
          De origem espanhola, o Truco chegou ao Brasil através dos imigrantes e se tornou
          parte da cultura popular, especialmente no Sul e Sudeste. Cada região desenvolveu
          suas próprias variações e regras, tornando o jogo ainda mais rico.
        </Text>
      </InfoSection>

      <InfoSection title="Diferenças: SP vs MG">
        <View style={styles.regionCard}>
          <Text style={styles.regionTitle}>São Paulo</Text>
          <Text style={styles.body}>
            Em SP, o mais comum é o Truco Paulista com manilha nova ou vira. A carta
            virada determina as manilhas. Jogo vai até 12 pontos.
          </Text>
        </View>
        <View style={styles.regionCard}>
          <Text style={styles.regionTitle}>Minas Gerais</Text>
          <Text style={styles.body}>
            Em MG, é mais comum o Truco Mineiro com manilhas fixas. O jogo costuma ser
            mais mentiroso e vai até 12 pontos também.
          </Text>
        </View>
      </InfoSection>

      <ActionButton
        accessibilityLabel="Ver regras completas"
        icon={BookOpen}
        label="Ver Regras Completas"
        onPress={() => navigation.navigate('Rules')}
      />
    </PageScaffold>
  );
}

const styles = StyleSheet.create({
  body: {
    color: theme.colors.textMuted,
    fontSize: 17,
    lineHeight: 25,
    marginBottom: theme.spacing.md,
  },
  regionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  regionTitle: {
    color: theme.colors.gold,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  section: {
    marginBottom: theme.spacing.xxl,
  },
  sectionTitle: {
    color: theme.colors.gold,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: theme.spacing.md,
  },
});
