/* eslint-disable import/no-extraneous-dependencies,  array-callback-return, import/no-unresolved */

import "core-js/stable";
import "regenerator-runtime/runtime";
import { getHighScores, submitHighScore } from "../Score/Api";

test("Successfully receive JSON object via API using GET method", () => {
  getHighScores().then((data) => {
    expect(typeof data).toBe("object");
  });
});

test("Successfully receive to data", () => {
  getHighScores().then((data) => {
    expect(typeof data).toBe("object");
  });
});

test("Receive data to be 'string - number' pair", () => {
  getHighScores().then((data) => {
    data.map((d) => {
      expect(typeof d[0]).toBe("string");
      expect(typeof d[1]).toBe("number");
    });
  });
});

test("Fail to receive to data", () => {
  getHighScores("wrong key").then((data) => {
    expect(data).toHaveLength(0);
  });
});

test("Fail to post data, without username as parameter", () => {
  submitHighScore().then((data) => {
    expect(data).toBe(
      `{"message": "You need to provide a valid user for the score"}`
    );
  });
});

test("Fail to post data, without score as parameter", () => {
  submitHighScore("api_key", "test_user").then((data) => {
    expect(data).toBe(
      `{"message": "You need to provide a valid score for the leaderboard"}`
    );
  });
});
