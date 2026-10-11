import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useResponsive } from '@/hooks/useResponsive';
import { theme } from '@/theme';

import { AdBannerPlaceholder } from '../ads/AdBannerPlaceholder';
import { PageHeader } from './PageHeader';

const BANNER_RESERVED_HEIGHT = 82;

interface PageScaffoldProps {
  title?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onRanking?: () => void;
  scrollable?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

export function PageScaffold({
  title,
  children,
  onBack,
  onRanking,
  scrollable = true,
  contentStyle,
}: PageScaffoldProps) {
  const { maxContentWidth, sidePadding } = useResponsive();
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.inner,
        !scrollable && styles.innerFill,
        {
          maxWidth: maxContentWidth,
          paddingBottom: theme.spacing.xxxl + BANNER_RESERVED_HEIGHT + insets.bottom,
          paddingHorizontal: sidePadding,
          paddingTop: title ? theme.spacing.xl : Math.max(theme.spacing.xl, insets.top + theme.spacing.md),
        },
        contentStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView
      edges={title ? ['left', 'right', 'bottom'] : ['top', 'left', 'right', 'bottom']}
      style={styles.safeArea}>
      {title ? (
        <PageHeader
          onBack={onBack}
          onRanking={onRanking}
          title={title}
          topInset={insets.top}
        />
      ) : null}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        {scrollable ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {content}
          </ScrollView>
        ) : (
          <View style={styles.flex}>{content}</View>
        )}
      </KeyboardAvoidingView>
      <AdBannerPlaceholder />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  inner: {
    alignSelf: 'center',
    width: '100%',
  },
  innerFill: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
