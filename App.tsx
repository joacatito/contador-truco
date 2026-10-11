import React from 'react';
import { StatusBar } from 'react-native';

import { AppProviders } from '@/app/AppProviders';

export default function App() {
  return (
    <AppProviders>
      <StatusBar animated barStyle="light-content" />
    </AppProviders>
  );
}
