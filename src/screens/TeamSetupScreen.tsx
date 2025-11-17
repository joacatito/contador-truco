import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { BannerAd } from '../components/BannerAd';
import { colors, spacing, typography } from '../theme/colors';
import { useGame } from '../context/GameContext';
import { RootStackParamList } from '../navigation/AppNavigator';

export const TeamSetupScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { teams, updateTeamName, addTeam } = useGame();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Cadastre os times</Text>
          <Text style={styles.subtitle}>
            Vale dupla, trio ou até time barulhento. Selecione o campo e já sai digitando, o texto todo fica marcado.
          </Text>
          {teams.map((team, index) => (
            <View key={team.id} style={styles.teamRow}>
              <Text style={styles.teamLabel}>Time {index + 1}</Text>
              <TextInput
                style={styles.input}
                value={team.name}
                selectTextOnFocus
                onChangeText={text => updateTeamName(team.id, text)}
                placeholder="Digite um apelido fácil de lembrar"
                placeholderTextColor={colors.muted}
              />
            </View>
          ))}
          <AppButton label="Adicionar time" variant="secondary" onPress={addTeam} />
          <Text style={styles.helper}>
            Chamamos todo mundo de time para simplificar. Pode ser dupla, trio ou o que a mesa decidir. Depois, na próxima tela,
            você escolhe quem realmente vai jogar a partida.
          </Text>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.primaryActionRow}>
            <AppButton
              label="Próximo"
              variant="secondary"
              style={styles.primaryActionButton}
              onPress={() => navigation.navigate('TeamSelection')}
            />
          </View>
          <View style={styles.footerButtons}>
            <View style={styles.flexSpacer} />
            <AppButton label="Voltar" variant="ghost" onPress={() => navigation.navigate('ManilhaSelection')} />
          </View>
          <BannerAd label="Banner - Times" />
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
    gap: 16,
    paddingBottom: 32,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    lineHeight: 22,
  },
  teamRow: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.accentDark,
  },
  teamLabel: {
    color: colors.muted,
    fontSize: typography.small,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.accentDark,
    fontSize: typography.body,
  },
  helper: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  footer: {
    gap: 12,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'flex-end',
  },
  primaryActionRow: {
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryActionButton: {
    minWidth: 220,
  },
  flexSpacer: {
    flex: 1,
  },
});
