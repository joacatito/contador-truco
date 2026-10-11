import { incrementRanking, toRankingEntries } from '@/utils/ranking';

describe('ranking utils', () => {
  it('stores wins by team id and increments the same team', () => {
    const first = incrementRanking({}, { id: 't1', name: 'Os Parceiros' });
    const second = incrementRanking(first, { id: 't1', name: 'Os Parceiros' });

    expect(second).toEqual({
      t1: {
        name: 'Os Parceiros',
        wins: 2,
      },
    });
  });

  it('sorts ranking entries by wins descending', () => {
    const entries = toRankingEntries({
      a: { name: 'Time A', wins: 1 },
      c: { name: 'Time C', wins: 5 },
      b: { name: 'Time B', wins: 3 },
    });

    expect(entries.map(entry => entry.id)).toEqual(['c', 'b', 'a']);
  });
});
