import "core-js/stable";
import "regenerator-runtime/runtime";
import { submitHighScore, getHighScores } from "../Score/Api";

test("Successfully receive JSON object via API using GET method", () => {
  getHighScores().then((data) => {
    expect(typeof data).toBe("object");
  });
});

test("Successfully receive to data using correct", () => {
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
