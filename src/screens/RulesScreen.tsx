import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PageScaffold } from '@/components/layout/PageScaffold';
import type { ScreenProps } from '@/navigation/types';
import { theme } from '@/theme';

function RuleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.bodyList}>{text}</Text>
    </View>
  );
}

export function RulesScreen({ navigation }: ScreenProps<'Rules'>) {
  return (
    <PageScaffold onBack={() => navigation.goBack()} title="Regras do Truco">
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regras Principais</Text>
        <Bullet text='A primeira carta é sempre para o "mão" (quem começa a rodada).' />
        <Bullet text='A última carta é sempre para o "pé" (último a receber).' />
        <Bullet text="Se for cortar o baralho, não pode embaralhar mais de 3 vezes." />
        <Bullet text="Cada jogador recebe 3 cartas." />
        <Bullet text="Quem vence 2 das 3 rodadas ganha a mão e marca ponto." />
        <Bullet text="Se empatar a primeira, quem ganhar a segunda leva." />
        <Bullet text='Pode-se "trucar" durante a rodada.' />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Valores das Cartas</Text>
        <Text style={styles.body}>Ordem crescente de força:</Text>
        <View style={styles.orderChip}>
          <Text style={styles.orderText}>4 &lt; 5 &lt; 6 &lt; 7 &lt; Q &lt; J &lt; K &lt; A &lt; 2 &lt; 3</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manilhas</Text>
        <RuleCard title="Manilha Velha">
          <Text style={styles.body}>As manilhas são sempre as mesmas, nesta ordem:</Text>
          <Text style={styles.bodyList}>1º 4 de Paus (Zap)</Text>
          <Text style={styles.bodyList}>2º 7 de Copas</Text>
          <Text style={styles.bodyList}>3º Ás de Espadas</Text>
          <Text style={styles.bodyList}>4º 7 de Ouros</Text>
          <Text style={styles.highlight}>Jogo vai até 15 pontos</Text>
        </RuleCard>

        <RuleCard title="Truco Paulista">
          <Text style={styles.body}>
            Uma carta é virada e a carta seguinte vira manilha. Ordem de naipes:
            Paus, Copas, Espadas e Ouros.
          </Text>
          <Text style={styles.highlight}>Jogo vai até 12 pontos</Text>
        </RuleCard>

        <RuleCard title="Truco Mineiro">
          <Text style={styles.body}>
            Jogado com baralho espanhol sem 8, 9, 10 e sem 4, 5, 6 e 7. Uma carta é
            virada e a seguinte vira manilha. Mesma ordem de naipes: Paus, Copas,
            Espadas e Ouros.
          </Text>
          <Text style={styles.highlight}>Jogo vai até 12 pontos</Text>
        </RuleCard>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sistema de Truco</Text>
        <Bullet text="Truco 3" />
        <Bullet text="Seis 6" />
        <Bullet text="Nove 9" />
        <Bullet text="Doze 12" />
        <Bullet text="Na manilha velha ainda existe o Quinze, valendo 15 pontos." />
      </View>
    </PageScaffold>
  );
}

const styles = StyleSheet.create({
  body: {
    color: theme.colors.textMuted,
    fontSize: 17,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  bodyList: {
    color: theme.colors.textMuted,
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
  },
  bullet: {
    color: theme.colors.gold,
    fontSize: 26,
    lineHeight: 26,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  cardTitle: {
    color: theme.colors.gold,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  highlight: {
    color: theme.colors.textSoft,
    fontSize: 15,
    fontWeight: '700',
    marginTop: theme.spacing.sm,
  },
  orderChip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
  },
  orderText: {
    color: theme.colors.textMuted,
    fontSize: 18,
    textAlign: 'center',
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
