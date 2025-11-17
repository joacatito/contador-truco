import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { BannerAd } from '../components/BannerAd';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../theme/colors';

export const AboutScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Sobre o app</Text>
          <Text style={styles.paragraph}>
            O Contador de Truco nasceu para quem joga no bar, no sítio ou no intervalo do churrasco. Nada de menus complicados:
            você seleciona a manilha, escolhe os times e sai marcando ponto.
          </Text>
          <Text style={styles.title}>Sobre o truco</Text>
          <Text style={styles.paragraph}>
            O truco chegou ao Brasil pelos imigrantes espanhóis e italianos. Em Minas Gerais domina a manilha velha, com o zap reinando.
            Já em São Paulo o vira define tudo, criando as versões de manilha nova. Cada região tem seu tempero, mas todo mundo comemora
            gritando truco, seis e nove.
          </Text>
          <Text style={styles.paragraph}>
            O app respeita essas diferenças: você escolhe o estilo, cadastra as duplas ou trios e guarda o ranking dos campeões da noite.
          </Text>
          <View style={styles.rulesCard}>
            <Text style={styles.cardTitle}>Quer estudar as regras?</Text>
            <Text style={styles.paragraph}>
              Explicamos o embaralhar, as manilhas e o jeito de pedir truco. É só abrir a tela de regras.
            </Text>
            <AppButton label="Ver Regras" onPress={() => navigation.navigate('Rules')} />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <View style={styles.flexSpacer} />
            <AppButton label="Voltar" variant="ghost" onPress={() => navigation.goBack()} />
          </View>
          <BannerAd label="Banner - Sobre" />
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
    fontSize: typography.title,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  paragraph: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  rulesCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.accent,
    gap: 8,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: typography.subtitle,
    fontWeight: '700',
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
