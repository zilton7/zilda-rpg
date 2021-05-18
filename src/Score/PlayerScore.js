let playerScore = 0;

const updatePlayerScore = (inputPlayerScore) => {
  playerScore += inputPlayerScore;
};

const getPlayerScore = () => playerScore;

const updateScoreText = (element) => {
  setInterval(() => {
    element.setText(`score: ${playerScore}`);
  }, 500);
};

export { updatePlayerScore, getPlayerScore, updateScoreText };
