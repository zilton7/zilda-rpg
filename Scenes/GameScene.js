import "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // load images
    // this.load.image("logo", "./src/assets/logo.png");
  }

  create() {
    this.add.image(400, 300, "logfo");
  }
}

export default GameScene;
