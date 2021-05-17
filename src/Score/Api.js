const fetch = require("node-fetch");

const gameId = "U7j7o8MocFkvuE4OwhWl";

const sortData = (object) => {
  const arr = [];
  for (let i = 0; i < object.length; i++) {
    arr.push([object[i].user, object[i].score]);
  }
  let sortedArr = Array.from(arr).sort((a, b) => b[1] - a[1]);
  return sortedArr;
};

const submitHighScore = async (name, score) => {
  const submit = {
    user: name,
    score,
  };
  const post = JSON.stringify(submit);
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: post,
  });
  const answer = await response.json();
  return answer;
};

const getHighScores = async () => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const answer = await response.json();
  const sortedData = sortData(answer.result);
  return sortedData;
};

export { submitHighScore, getHighScores };
