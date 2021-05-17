import "phaser";
import Button from "../Objects/Button";
import { getPlayerName } from "../Score/PlayerName";
import { getPlayerScore } from "../Score/PlayerScore";
import { getHighScores, submitHighScore } from "../Score/Api";
class NameInputScene extends Phaser.Scene {
  constructor() {
    super("HighScoreScene");
  }

  preload() {
    if (getPlayerScore() > 0) {
      submitHighScore(getPlayerName(), getPlayerScore());
    }
  }

  create() {
    // Display Player's Score
    this.message = this.add
      .text(400, 50, `${getPlayerName()}'s score: ${getPlayerScore()}`, {
        color: "#1c9326",
        fontSize: 25,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    // Display High Scores
    this.message = this.add
      .text(400, 100, "High Scores", {
        color: "#FFFFFF",
        fontSize: 30,
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.scores = this.add
      .text(400, 300, "Loading Data", {
        color: "#FFFFFF",
        fontSize: 25,
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    const receiveHighScore = async () => {
      const leaderBoard = await getHighScores();
      let scoreString = "";
      leaderBoard.slice(0, 11).forEach((score) => {
        scoreString += `${score[0]} - ${score[1]}\n`;
      });
      this.scores.setText(scoreString);
    };
    receiveHighScore();

    this.menuButton = new Button(
      this,
      400,
      500,
      "blueButton1",
      "blueButton2",
      "Menu",
      "Title"
    );
  }
}

export default NameInputScene;
