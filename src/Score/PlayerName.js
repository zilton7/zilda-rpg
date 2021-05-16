let playerName = "Guest";

const setPlayerName = (str) => {
  console.log(str);
  if (str === "") {
    playerName = "Guest";
  } else {
    playerName = str;
  }
};

const getPlayerName = () => playerName;

export { setPlayerName, getPlayerName };
