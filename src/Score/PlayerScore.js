let playerScore = 0;

const setPlayerScore = (inputPlayerScore) => {
  playerScore = inputPlayerScore;
};

const getPlayerScore = () => playerScore;

export { setPlayerScore, getPlayerScore };
