import "regenerator-runtime/runtime";
import "phaser";
import config from "./Config/config";
import NameInputScene from "./Scenes/NameInputScene";
import HighScoreScene from "./Scenes/HighScoreScene";
import BootScene from "./Scenes/BootScene";
import WorldScene from "./Scenes/WorldScene";
import BattleScene from "./Scenes/BattleScene";
import UIScene from "./Scenes/UIScene";
import PreloaderScene from "./Scenes/PreloaderScene";
import TitleScene from "./Scenes/TitleScene";
import OptionsScene from "./Scenes/OptionsScene";
import CreditsScene from "./Scenes/CreditsScene";
import Model from "./Model";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add("NameInput", NameInputScene);
    this.scene.add("HighScore", HighScoreScene);
    this.scene.add("Boot", BootScene);
    this.scene.add("Preloader", PreloaderScene);
    this.scene.add("Title", TitleScene);
    this.scene.add("Options", OptionsScene);
    this.scene.add("Credits", CreditsScene);
    this.scene.add("World", WorldScene);
    this.scene.add("Battle", BattleScene);
    this.scene.add("UI", UIScene);

    this.scene.start("NameInput");
  }
}

window.game = new Game();
