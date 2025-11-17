import React, { createContext, useContext, useMemo, useReducer, useCallback } from 'react';

export type ManilhaType = 'velha' | 'nova';

export interface Team {
  id: string;
  name: string;
  wins: number;
}

interface SelectedTeams {
  first?: string;
  second?: string;
}

interface GameState {
  manilhaType: ManilhaType | null;
  teams: Team[];
  selected: SelectedTeams;
  scores: Record<string, number>;
}

const createTeam = (index: number): Team => ({
  id: Math.random().toString(36).slice(2, 9),
  name: `Time ${index}`,
  wins: 0,
});

const initialTeams = [createTeam(1), createTeam(2)];

const initialState: GameState = {
  manilhaType: null,
  teams: initialTeams,
  selected: {
    first: initialTeams[0]?.id,
    second: initialTeams[1]?.id,
  },
  scores: initialTeams.reduce<Record<string, number>>((acc, team) => {
    acc[team.id] = 0;
    return acc;
  }, {}),
};

type Action =
  | { type: 'SET_MANILHA'; payload: ManilhaType }
  | { type: 'ADD_TEAM' }
  | { type: 'UPDATE_TEAM_NAME'; payload: { id: string; name: string } }
  | { type: 'SET_SELECTED'; payload: { slot: keyof SelectedTeams; id?: string } }
  | { type: 'SET_SCORE'; payload: { id: string; value: number } }
  | { type: 'INCREMENT_SCORE'; payload: { id: string; amount: number } }
  | { type: 'RESET_SCORES_FOR_SELECTED' }
  | { type: 'REGISTER_WIN'; payload: { id: string } };

const reducer = (state: GameState, action: Action): GameState => {
  const maxScore = state.manilhaType === 'velha' ? 15 : 12;

  switch (action.type) {
    case 'SET_MANILHA':
      return { ...state, manilhaType: action.payload };
    case 'ADD_TEAM': {
      const nextIndex = state.teams.length + 1;
      const newTeam = createTeam(nextIndex);
      return {
        ...state,
        teams: [...state.teams, newTeam],
        scores: { ...state.scores, [newTeam.id]: 0 },
      };
    }
    case 'UPDATE_TEAM_NAME':
      return {
        ...state,
        teams: state.teams.map(team =>
          team.id === action.payload.id ? { ...team, name: action.payload.name } : team,
        ),
      };
    case 'SET_SELECTED': {
      const { slot, id } = action.payload;
      const opposite = slot === 'first' ? 'second' : 'first';
      const nextSelected: SelectedTeams = { ...state.selected };

      if (nextSelected[opposite] && nextSelected[opposite] === id) {
        nextSelected[opposite] = undefined;
      }

      nextSelected[slot] = id;

      const nextScores = { ...state.scores };
      if (id && nextScores[id] == null) {
        nextScores[id] = 0;
      }

      return {
        ...state,
        selected: nextSelected,
        scores: nextScores,
      };
    }
    case 'SET_SCORE':
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.payload.id]: Math.min(maxScore, Math.max(0, action.payload.value)),
        },
      };
    case 'INCREMENT_SCORE': {
      const current = state.scores[action.payload.id] ?? 0;
      const nextValue = Math.min(maxScore, Math.max(0, current + action.payload.amount));
      return {
        ...state,
        scores: { ...state.scores, [action.payload.id]: nextValue },
      };
    }
    case 'RESET_SCORES_FOR_SELECTED': {
      const update = { ...state.scores };
      if (state.selected.first) {
        update[state.selected.first] = 0;
      }
      if (state.selected.second) {
        update[state.selected.second] = 0;
      }
      return { ...state, scores: update };
    }
    case 'REGISTER_WIN':
      return {
        ...state,
        teams: state.teams.map(team =>
          team.id === action.payload.id ? { ...team, wins: team.wins + 1 } : team,
        ),
      };
    default:
      return state;
  }
};

interface GameContextValue extends GameState {
  setManilhaType: (type: ManilhaType) => void;
  addTeam: () => void;
  updateTeamName: (id: string, name: string) => void;
  selectTeam: (slot: keyof SelectedTeams, id?: string) => void;
  setScore: (teamId: string, value: number) => void;
  incrementScore: (teamId: string, amount: number) => void;
  resetSelectedScores: () => void;
  registerWin: (teamId: string) => void;
  selectedTeamsData: { first?: Team; second?: Team };
  winningScore: number;
  ranking: Team[];
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setManilhaType = useCallback(
    (type: ManilhaType) => dispatch({ type: 'SET_MANILHA', payload: type }),
    [],
  );
  const addTeam = useCallback(() => dispatch({ type: 'ADD_TEAM' }), []);
  const updateTeamName = useCallback(
    (id: string, name: string) => dispatch({ type: 'UPDATE_TEAM_NAME', payload: { id, name } }),
    [],
  );
  const selectTeam = useCallback(
    (slot: keyof SelectedTeams, id?: string) => dispatch({ type: 'SET_SELECTED', payload: { slot, id } }),
    [],
  );
  const setScore = useCallback(
    (teamId: string, value: number) =>
      dispatch({ type: 'SET_SCORE', payload: { id: teamId, value: Math.max(0, value) } }),
    [],
  );
  const incrementScore = useCallback(
    (teamId: string, amount: number) =>
      dispatch({ type: 'INCREMENT_SCORE', payload: { id: teamId, amount } }),
    [],
  );
  const resetSelectedScores = useCallback(
    () => dispatch({ type: 'RESET_SCORES_FOR_SELECTED' }),
    [],
  );
  const registerWin = useCallback((id: string) => dispatch({ type: 'REGISTER_WIN', payload: { id } }), []);

  const selectedTeamsData = useMemo(() => {
    const first = state.teams.find(team => team.id === state.selected.first);
    const second = state.teams.find(team => team.id === state.selected.second);
    return { first, second };
  }, [state.selected.first, state.selected.second, state.teams]);

  const winningScore = state.manilhaType === 'velha' ? 15 : 12;

  const ranking = useMemo(() => {
    return [...state.teams].sort((a, b) => {
      if (b.wins !== a.wins) {
        return b.wins - a.wins;
      }
      return a.name.localeCompare(b.name);
    });
  }, [state.teams]);

  const value: GameContextValue = {
    ...state,
    setManilhaType,
    addTeam,
    updateTeamName,
    selectTeam,
    setScore,
    incrementScore,
    resetSelectedScores,
    registerWin,
    selectedTeamsData,
    winningScore,
    ranking,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame deve ser usado dentro de GameProvider');
  }
  return ctx;
};
