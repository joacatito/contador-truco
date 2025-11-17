import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { ADS_IDS } from '../config/ads';
import { randomThreshold } from '../utils/random';

type Reason = 'points' | 'start' | 'finish';

interface InterstitialContextValue {
  registerPointClick: () => void;
  registerGameStart: () => void;
  registerGameFinished: () => void;
  hideInterstitial: () => void;
  isVisible: boolean;
  currentMessage: string;
}

const InterstitialContext = createContext<InterstitialContextValue | undefined>(
  undefined,
);

const messages: Record<Reason, string> = {
  points: 'Um intervalo rápido para pagar a rodada. Este é o espaço da sua monetização por clique de pontos.',
  start: 'Começando mais uma mão? Aqui entra seu interstitial de início de partida.',
  finish: 'Jogo encerrado! Mostre o anúncio valendo para capitalizar cada vitória.',
};

export const InterstitialProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [, setPointClicksLeft] = useState(randomThreshold());
  const [, setGamesLeft] = useState(randomThreshold());

  const show = useCallback((reason: Reason) => {
    const platform = Platform.select({ ios: 'iOS', android: 'Android', default: 'Simulador' });
    const id = Platform.select({
      ios: ADS_IDS.test.ios.interstitial,
      android: ADS_IDS.test.android.interstitial,
      default: 'TEST_INTERSTITIAL',
    });
    setCurrentMessage(`${messages[reason]}\n(${platform}: ${id})`);
    setIsVisible(true);
  }, []);

  const hideInterstitial = useCallback(() => setIsVisible(false), []);

  const registerPointClick = useCallback(() => {
    setPointClicksLeft(prev => {
      const remainder = prev - 1;
      if (remainder <= 0) {
        show('points');
        return randomThreshold();
      }
      return remainder;
    });
  }, [show]);

  const registerGameStart = useCallback(() => {
    setGamesLeft(prev => {
      const remainder = prev - 1;
      if (remainder <= 0) {
        show('start');
        return randomThreshold();
      }
      return remainder;
    });
  }, [show]);

  const registerGameFinished = useCallback(() => {
    setGamesLeft(randomThreshold());
    show('finish');
  }, [show]);

  const value = useMemo(
    () => ({
      registerPointClick,
      registerGameStart,
      registerGameFinished,
      hideInterstitial,
      isVisible,
      currentMessage,
    }),
    [registerGameFinished, registerGameStart, registerPointClick, hideInterstitial, isVisible, currentMessage],
  );

  return (
    <InterstitialContext.Provider value={value}>
      {children}
    </InterstitialContext.Provider>
  );
};

export const useInterstitials = () => {
  const ctx = useContext(InterstitialContext);
  if (!ctx) {
    throw new Error('useInterstitials deve ser usado dentro de InterstitialProvider');
  }
  return ctx;
};
