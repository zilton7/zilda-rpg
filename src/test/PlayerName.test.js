import { setPlayerName, getPlayerName } from "../Score/PlayerName";

test("Default player name should be 'Guest'", () => {
  expect(getPlayerName()).toBe("Guest");
});

test("If name input field is empty name should be 'Guest'", () => {
  setPlayerName("");
  expect(getPlayerName()).toBe("Guest");
});

test("Player name must be a string", () => {
  expect(typeof getPlayerName()).toBe("string");
});

test("Successfully set player name", () => {
  setPlayerName("Zil");
  expect(getPlayerName()).toBe("Zil");
});
