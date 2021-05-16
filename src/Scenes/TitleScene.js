import "phaser";
import config from "../Config/config";
import Button from "../Objects/Button";
import { getPlayerName } from "../Score/PlayerName";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }
  create() {
    // Add background image
    this.add.image(0, 0, "background").setOrigin(0).setScale(0.65);

    // Add dark Box
    this.add.rectangle(400, 300, 250, 550, 0x000000).setAlpha(0.75);

    // add logo image
    this.add.image(265, 30, "logo").setOrigin(0).setScale(0.5);

    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      "blueButton1",
      "blueButton2",
      "Play",
      "WorldScene"
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      "blueButton1",
      "blueButton2",
      "Options",
      "Options"
    );

    // HighScores
    this.highScoreButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      "blueButton1",
      "blueButton2",
      "HighScores",
      "HighScoreScene"
    );

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      "blueButton1",
      "blueButton2",
      "Credits",
      "Credits"
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add("bgMusic", { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
