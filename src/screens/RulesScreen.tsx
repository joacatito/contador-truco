import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { BannerAd } from '../components/BannerAd';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../theme/colors';

const bullets = [
  'Primeira carta sempre vai para o mão, última para o pé. Garante a ordem e evita confusão.',
  'Se cortou o baralho, pode embaralhar no máximo três vezes. Passou disso vira bagunça.',
];

export const RulesScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Regras principais</Text>
          {bullets.map(rule => (
            <Text key={rule} style={styles.paragraph}>
              • {rule}
            </Text>
          ))}
          <Text style={styles.title}>Manilhas</Text>
          <Text style={styles.paragraph}>
            Zap, sete de copas, espadilha e sete de ouro são a base da manilha velha. São fixas e fáceis de decorar.
            Já a manilha nova depende do vira: a carta logo acima vira a poderosa. Quer revisar cada estilo? Abra uma das telas abaixo.
          </Text>
          <View style={styles.buttons}>
            <AppButton label="Manilha Velha" variant="secondary" onPress={() => navigation.navigate('ManilhaInfo', { variant: 'velha' })} />
            <AppButton label="Manilha Nova (com 4,5,6,7)" variant="secondary" onPress={() => navigation.navigate('ManilhaInfo', { variant: 'nova_composta' })} />
            <AppButton label="Manilha Nova Limpa" variant="secondary" onPress={() => navigation.navigate('ManilhaInfo', { variant: 'nova_limpa' })} />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <View style={styles.flexSpacer} />
            <AppButton label="Voltar" variant="ghost" onPress={() => navigation.goBack()} />
          </View>
          <BannerAd label="Banner - Regras" />
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
    gap: 12,
    paddingBottom: 32,
  },
  title: {
    fontSize: typography.subtitle,
    color: colors.textPrimary,
    fontWeight: '700',
    marginTop: 12,
  },
  paragraph: {
    color: colors.textSecondary,
    lineHeight: 22,
    fontSize: typography.body,
  },
  buttons: {
    gap: 12,
    marginTop: 12,
  },
  footer: {
    gap: 12,
    marginTop: 16,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flexSpacer: {
    flex: 1,
  },
});
