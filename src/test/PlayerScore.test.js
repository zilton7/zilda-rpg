import { updatePlayerScore, getPlayerScore } from '../Score/PlayerScore';

test('Player score must be an integer', () => {
  expect(typeof getPlayerScore()).toBe('number');
});

test('Default player score should be 0', () => {
  expect(getPlayerScore()).toBe(0);
});

test('Successfully update player score', () => {
  updatePlayerScore(100);
  expect(getPlayerScore()).toBe(100);
});
