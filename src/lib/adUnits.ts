import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

const PRODUCTION_AD_UNITS = {
  android: {
    banner: 'ca-app-pub-4936418832972144/4515843891',
    interstitial: 'ca-app-pub-4936418832972144/9587462316',
  },
  ios: {
    banner: 'ca-app-pub-4936418832972144/5745165087',
    interstitial: 'ca-app-pub-4936418832972144/3022053960',
  },
};

const platformUnits = Platform.OS === 'ios' ? PRODUCTION_AD_UNITS.ios : PRODUCTION_AD_UNITS.android;

// Em desenvolvimento usamos os IDs de teste do Google para não gerar tráfego inválido.
export const AD_UNITS = {
  banner: __DEV__ ? TestIds.ADAPTIVE_BANNER : platformUnits.banner,
  interstitial: __DEV__ ? TestIds.INTERSTITIAL : platformUnits.interstitial,
};
