import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';

import { AppProviders } from '@/app/AppProviders';

export default function App() {
  useEffect(() => {
    mobileAds().initialize();
  }, []);

  return (
    <AppProviders>
      <StatusBar animated barStyle="light-content" />
    </AppProviders>
  );
}
