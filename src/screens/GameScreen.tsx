import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { InterstitialAdModal } from '@/components/ads/InterstitialAdModal';
import { ScoreColumn } from '@/components/game/ScoreColumn';
import { WinnerOverlay } from '@/components/game/WinnerOverlay';
import { PageScaffold } from '@/components/layout/PageScaffold';
import { RankingModal } from '@/components/ranking/RankingModal';
import { useResponsive } from '@/hooks/useResponsive';
import {
  shouldShowInterstitialOnGameOpen,
  shouldShowInterstitialOnScoreAction,
} from '@/lib/ads';
import type { ScreenProps } from '@/navigation/types';
import {
  loadCurrentTeams,
  loadGameManilha,
  loadRanking,
  saveRanking,
} from '@/storage/gameStorage';
import { theme } from '@/theme';
import type { ManilhaType, Team } from '@/types/game';
import {
  applyScoreDelta,
  getGameTitle,
  getScoreButtons,
  getScoreLimit,
  sanitizeScore,
} from '@/utils/game';
import { incrementRanking, toRankingEntries } from '@/utils/ranking';

export function GameScreen({ navigation }: ScreenProps<'Game'>) {
  const { isTablet, isPhonePortrait } = useResponsive();
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);
  const [manilha, setManilha] = useState<ManilhaType>('paulista');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [rankingVisible, setRankingVisible] = useState(false);
  const [rankingEntries, setRankingEntries] = useState(toRankingEntries({}));
  const [interstitialVisible, setInterstitialVisible] = useState(false);
  const [winner, setWinner] = useState<Team | null>(null);
  const [winnerVisible, setWinnerVisible] = useState(false);
  const clickCountRef = useRef(0);
  const hasWinnerRef = useRef(false);

  const maxScore = getScoreLimit(manilha);
  const scoreButtons = getScoreButtons(manilha);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setScore1(0);
      setScore2(0);
      setWinner(null);
      setWinnerVisible(false);
      setInterstitialVisible(false);
      clickCountRef.current = 0;
      hasWinnerRef.current = false;

      async function loadData() {
        const [{ team1: savedTeam1, team2: savedTeam2 }, savedManilha, savedRanking] =
          await Promise.all([loadCurrentTeams(), loadGameManilha(), loadRanking()]);

        if (!active) {
          return;
        }

        setTeam1(savedTeam1);
        setTeam2(savedTeam2);
        setManilha(savedManilha ?? 'paulista');
        setRankingEntries(toRankingEntries(savedRanking));
        setInterstitialVisible(shouldShowInterstitialOnGameOpen());
      }

      loadData();
      return () => {
        active = false;
      };
    }, []),
  );

  async function resolveWinner(nextScore1: number, nextScore2: number) {
    if (hasWinnerRef.current || !team1 || !team2) {
      return;
    }

    const reachedLimit = nextScore1 >= maxScore || nextScore2 >= maxScore;
    if (!reachedLimit) {
      return;
    }

    hasWinnerRef.current = true;
    clickCountRef.current = 0;
    setInterstitialVisible(false);
    const winnerTeam = nextScore1 >= maxScore ? team1 : team2;
    const currentRanking = await loadRanking();
    const nextRanking = incrementRanking(currentRanking, winnerTeam);
    await saveRanking(nextRanking);
    setRankingEntries(toRankingEntries(nextRanking));
    setWinner(winnerTeam);
    setWinnerVisible(true);
  }

  async function handleScoreChange(teamNumber: 1 | 2, value: string) {
    const nextValue = sanitizeScore(value, maxScore);
    const nextScore1 = teamNumber === 1 ? nextValue : score1;
    const nextScore2 = teamNumber === 2 ? nextValue : score2;

    if (teamNumber === 1) {
      setScore1(nextValue);
    } else {
      setScore2(nextValue);
    }

    await resolveWinner(nextScore1, nextScore2);
  }

  async function handleAddPoints(teamNumber: 1 | 2, points: number) {
    const nextScore =
      teamNumber === 1 ? applyScoreDelta(score1, points, maxScore) : applyScoreDelta(score2, points, maxScore);
    const nextScore1 = teamNumber === 1 ? nextScore : score1;
    const nextScore2 = teamNumber === 2 ? nextScore : score2;

    if (teamNumber === 1) {
      setScore1(nextScore);
    } else {
      setScore2(nextScore);
    }

    clickCountRef.current += 1;
    if (!hasWinnerRef.current && shouldShowInterstitialOnScoreAction(clickCountRef.current)) {
      setInterstitialVisible(true);
      clickCountRef.current = 0;
    }

    await resolveWinner(nextScore1, nextScore2);
  }

  function handleWinnerComplete() {
    setScore1(0);
    setScore2(0);
    clickCountRef.current = 0;
    hasWinnerRef.current = false;
    setWinnerVisible(false);
    setWinner(null);
    navigation.replace('SelectTeams');
  }

  if (!team1 || !team2) {
    return (
      <PageScaffold onBack={() => navigation.goBack()} title={getGameTitle(manilha)}>
        <View />
      </PageScaffold>
    );
  }

  return (
    <>
      <PageScaffold
        onBack={() => navigation.goBack()}
        onRanking={() => setRankingVisible(true)}
        title={getGameTitle(manilha)}>
        <View style={[styles.columns, !isTablet && styles.columnsStacked]}>
          <ScoreColumn
            buttons={scoreButtons}
            compact={!isTablet}
            maxScore={maxScore}
            onAddPoints={points => handleAddPoints(1, points)}
            onChangeScore={value => handleScoreChange(1, value)}
            reducedHeight={isPhonePortrait}
            score={score1}
            teamName={team1.name}
          />
          <ScoreColumn
            buttons={scoreButtons}
            compact={!isTablet}
            maxScore={maxScore}
            onAddPoints={points => handleAddPoints(2, points)}
            onChangeScore={value => handleScoreChange(2, value)}
            reducedHeight={isPhonePortrait}
            score={score2}
            teamName={team2.name}
          />
        </View>
      </PageScaffold>

      <RankingModal
        entries={rankingEntries}
        onClose={() => setRankingVisible(false)}
        visible={rankingVisible}
      />
      <InterstitialAdModal
        onClose={() => setInterstitialVisible(false)}
        visible={interstitialVisible}
      />
      <WinnerOverlay
        onComplete={handleWinnerComplete}
        visible={winnerVisible && !!winner}
        winnerName={winner?.name ?? ''}
      />
    </>
  );
}

const styles = StyleSheet.create({
  columns: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  columnsStacked: {
    flexDirection: 'column',
  },
});
