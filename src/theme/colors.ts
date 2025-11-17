import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const paddingValue = Math.round(width * 0.05);

export const colors = {
  background: '#0B4F3A',
  backdrop: '#073426',
  felt: '#0F6A45',
  textPrimary: '#FDF5E6',
  textSecondary: 'rgba(253, 245, 230, 0.85)',
  accent: '#F3A712',
  accentDark: '#C97C0A',
  danger: '#EF476F',
  muted: 'rgba(253, 245, 230, 0.5)',
  card: '#116E4F',
  bannerBackground: '#08392A',
  buttonText: '#1B1002',
};

export const spacing = {
  screenPadding: paddingValue,
};

export const typography = {
  title: 28,
  subtitle: 20,
  body: 16,
  small: 14,
};
