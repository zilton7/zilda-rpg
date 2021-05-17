let playerName = 'Guest';

const setPlayerName = (str) => {
  if (str === '') {
    playerName = 'Guest';
  } else {
    playerName = str;
  }
};

const getPlayerName = () => playerName;

export { setPlayerName, getPlayerName };
