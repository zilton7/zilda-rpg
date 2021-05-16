import "phaser";
import { getPlayerName } from "../Score/PlayerName";
import { getPlayerScore } from "../Score/PlayerScore";
import { getHighScores } from "../Score/Api";
class NameInputScene extends Phaser.Scene {
  constructor() {
    super("HighScoreScene");
  }

  preload() {}

  create() {
    // Display Player's Score
    this.message = this.add
      .text(400, 100, `${getPlayerName()}'s score: ${getPlayerScore()}`, {
        color: "#FFFFFF",
        fontSize: 30,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    // Display High Scores
    this.message = this.add
      .text(400, 50, "High Scores", {
        color: "#FFFFFF",
        fontSize: 30,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    console.log(getHighScores());
  }
}

export default NameInputScene;
