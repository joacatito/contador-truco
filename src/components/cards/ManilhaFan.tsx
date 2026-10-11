import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg';

import { useResponsive } from '@/hooks/useResponsive';

interface CardSpec {
  label: string;
  suit: string;
  color: string;
  tilt: string;
  center: React.ReactNode;
}

function CardFace({ spec, size }: { spec: CardSpec; size: number }) {
  const width = size;
  const height = size * 1.4;
  const font = size * 0.2;
  const smallSuit = size * 0.22;

  return (
    <View style={[styles.cardWrap, { transform: [{ rotate: spec.tilt }] }]}>
      <Svg height={height} viewBox="0 0 92 129" width={width}>
        <Rect
          fill="#ffffff"
          height={125}
          rx={8}
          stroke="#2f3a34"
          strokeWidth={2}
          width={88}
          x={2}
          y={2}
        />
        <SvgText fill={spec.color} fontSize={font} fontWeight="700" x={7} y={20}>
          {spec.label}
        </SvgText>
        <SvgText fill={spec.color} fontSize={smallSuit} x={5} y={36}>
          {spec.suit}
        </SvgText>
        {spec.center}
        <G rotation={180} origin="46,64.5">
          <SvgText fill={spec.color} fontSize={font} fontWeight="700" x={7} y={20}>
            {spec.label}
          </SvgText>
          <SvgText fill={spec.color} fontSize={smallSuit} x={5} y={36}>
            {spec.suit}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
}

export function ManilhaFan() {
  const { isLandscape, isTablet, isPhoneLandscape, width } = useResponsive();
  const cardSize = isTablet
    ? isLandscape
      ? 82
      : 98
    : isPhoneLandscape
      ? 44
      : width < 390
        ? 58
        : 70;

  const black = '#111111';
  const red = '#d62939';
  const centerSize = cardSize * 0.28;
  const aceSize = cardSize * 0.62;

  const cards: CardSpec[] = [
    {
      label: '4',
      suit: '♣',
      color: black,
      tilt: '-12deg',
      center: (
        <>
          <SvgText fill={black} fontSize={centerSize} x={26} y={60}>♣</SvgText>
          <SvgText fill={black} fontSize={centerSize} x={48} y={60}>♣</SvgText>
          <SvgText fill={black} fontSize={centerSize} x={26} y={82}>♣</SvgText>
          <SvgText fill={black} fontSize={centerSize} x={48} y={82}>♣</SvgText>
        </>
      ),
    },
    {
      label: '7',
      suit: '♥',
      color: red,
      tilt: '-3deg',
      center: (
        <>
          <SvgText fill={red} fontSize={centerSize} x={27} y={44}>♥</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={49} y={44}>♥</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={38} y={60}>♥</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={27} y={76}>♥</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={49} y={76}>♥</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={27} y={94}>♥</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={49} y={94}>♥</SvgText>
        </>
      ),
    },
    {
      label: 'A',
      suit: '♠',
      color: black,
      tilt: '3deg',
      center: <SvgText fill={black} fontSize={aceSize} x={24} y={82}>♠</SvgText>,
    },
    {
      label: '7',
      suit: '♦',
      color: red,
      tilt: '12deg',
      center: (
        <>
          <SvgText fill={red} fontSize={centerSize} x={27} y={44}>♦</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={49} y={44}>♦</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={38} y={60}>♦</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={27} y={76}>♦</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={49} y={76}>♦</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={27} y={96}>♦</SvgText>
          <SvgText fill={red} fontSize={centerSize} x={49} y={96}>♦</SvgText>
        </>
      ),
    },
  ];

  return (
    <View accessibilityLabel="Cartas manilhas na mesa" accessibilityRole="image" style={styles.row}>
      {cards.map(card => (
        <CardFace key={`${card.label}-${card.suit}`} size={cardSize} spec={card} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
});
