let playerName = "Guest";

const setPlayerName = (inputPlayerName) => {
  playerName = inputPlayerName;
  return `Player Name is: ${playerName}`;
};

const getPlayerName = () => playerName;

export { setPlayerName, getPlayerName };
