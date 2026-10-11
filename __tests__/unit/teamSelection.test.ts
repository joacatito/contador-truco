import {
  createDefaultTeams,
  getInitialTeamSelection,
  selectTeamForSlot,
} from '@/utils/teamSelection';

describe('team selection utils', () => {
  it('preselects the first two teams', () => {
    const defaults = createDefaultTeams();
    expect(getInitialTeamSelection(defaults)).toEqual({
      team1Id: '1',
      team2Id: '2',
    });
  });

  it('clears the opposite slot when a team is selected on both sides', () => {
    expect(selectTeamForSlot('1', '2', '2')).toEqual({
      nextCurrentSlotId: '2',
      nextOppositeSlotId: null,
    });
  });

  it('allows unselecting the current slot', () => {
    expect(selectTeamForSlot('1', '2', '1')).toEqual({
      nextCurrentSlotId: null,
      nextOppositeSlotId: '2',
    });
  });
});
