import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MANILHA_INFO, ManilhaVariant } from '../constants/manilhas';
import { colors, spacing, typography } from '../theme/colors';
import { AppButton } from '../components/AppButton';
import { BannerAd } from '../components/BannerAd';

export const ManilhaInfoScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ManilhaInfo'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const variant: ManilhaVariant = route.params?.variant ?? 'velha';
  const info = MANILHA_INFO[variant];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{info.title}</Text>
          <Text style={styles.paragraph}>{info.description}</Text>
          {info.bullets.map(text => (
            <Text key={text} style={styles.paragraph}>
              • {text}
            </Text>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <View style={styles.flexSpacer} />
            <AppButton label="Voltar" variant="ghost" onPress={() => navigation.goBack()} />
          </View>
          <BannerAd label="Banner - Manilhas" />
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
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: '700',
  },
  paragraph: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  footer: {
    gap: 12,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flexSpacer: {
    flex: 1,
  },
});
