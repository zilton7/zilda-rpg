import "phaser";
import { getPlayerName } from "../Score/PlayerName";

export default class NameInputScene extends Phaser.Scene {
  constructor() {
    super("HighScoreScene");
  }

  preload() {}

  create() {
    this.message = this.add
      .text(400, 50, "High Scores", {
        color: "#FFFFFF",
        fontSize: 30,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
  }
}
