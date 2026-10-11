import type { Team } from '@/types/game';

export function createDefaultTeams(): Team[] {
  return [
    { id: '1', name: 'Time 1' },
    { id: '2', name: 'Time 2' },
  ];
}

export function createNewTeam(teams: Team[]): Team {
  return {
    id: `${Date.now()}-${teams.length + 1}`,
    name: `Time ${teams.length + 1}`,
  };
}

export function getInitialTeamSelection(teams: Team[]): {
  team1Id: string | null;
  team2Id: string | null;
} {
  return {
    team1Id: teams[0]?.id ?? null,
    team2Id: teams[1]?.id ?? null,
  };
}

export function selectTeamForSlot(
  currentSlotId: string | null,
  oppositeSlotId: string | null,
  selectedId: string,
): {
  nextCurrentSlotId: string | null;
  nextOppositeSlotId: string | null;
} {
  if (currentSlotId === selectedId) {
    return {
      nextCurrentSlotId: null,
      nextOppositeSlotId: oppositeSlotId,
    };
  }

  return {
    nextCurrentSlotId: selectedId,
    nextOppositeSlotId: oppositeSlotId === selectedId ? null : oppositeSlotId,
  };
}

export function findTeamById(teams: Team[], teamId: string | null): Team | null {
  return teams.find(team => team.id === teamId) ?? null;
}
