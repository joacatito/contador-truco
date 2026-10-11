import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/common/ActionButton';
import { OptionCard } from '@/components/common/OptionCard';
import { PageScaffold } from '@/components/layout/PageScaffold';
import type { ScreenProps } from '@/navigation/types';
import { saveGameManilha } from '@/storage/gameStorage';
import { theme } from '@/theme';
import type { ManilhaType } from '@/types/game';

export function SelectManilhaScreen({ navigation }: ScreenProps<'SelectManilha'>) {
  const [selectedManilha, setSelectedManilha] = useState<ManilhaType | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleNext() {
    if (!selectedManilha || saving) {
      return;
    }

    setSaving(true);
    await saveGameManilha(selectedManilha);
    navigation.navigate('ManageTeams');
    setSaving(false);
  }

  return (
    <PageScaffold onBack={() => navigation.goBack()} title="Novo Jogo / Manilha">
      <View style={styles.content}>
        <Text style={styles.title}>Escolha o tipo de manilha:</Text>

        <View accessible accessibilityRole="radiogroup" style={styles.options}>
          <OptionCard
            onPress={() => setSelectedManilha('velha')}
            selected={selectedManilha === 'velha'}
            subtitle="Até 15 pontos"
            title="Manilha Velha"
          />
          <OptionCard
            onPress={() => setSelectedManilha('paulista')}
            selected={selectedManilha === 'paulista'}
            subtitle="Até 12 pontos"
            title="Manilha Nova / Truco Paulista"
          />
        </View>

        <ActionButton
          disabled={!selectedManilha}
          icon={ArrowRight}
          label={saving ? 'Salvando...' : 'Próximo'}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </PageScaffold>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: theme.spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  options: {
    gap: theme.spacing.md,
  },
  title: {
    color: theme.colors.white,
    fontSize: 26,
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
  },
});
