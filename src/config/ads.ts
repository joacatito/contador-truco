export const ADS_IDS = {
  test: {
    ios: {
      banner: 'ca-app-pub-3940256099942544/2934735716',
      interstitial: 'ca-app-pub-3940256099942544/4411468910',
    },
    android: {
      banner: 'ca-app-pub-3940256099942544/6300978111',
      interstitial: 'ca-app-pub-3940256099942544/1033173712',
    },
  },
  production: {
    ios: {
      banner: 'TROCAR_POR_IOS_BANNER_ID',
      interstitial: 'TROCAR_POR_IOS_INTERSTITIAL_ID',
    },
    android: {
      banner: 'TROCAR_POR_ANDROID_BANNER_ID',
      interstitial: 'TROCAR_POR_ANDROID_INTERSTITIAL_ID',
    },
  },
};

export type AdPlatform = keyof typeof ADS_IDS.test;
