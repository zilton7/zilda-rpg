import "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("logo", "./src/assets/zilda_logo.png");
    //add background image for the scene
    this.load.image("background", "./src/assets/background.jpg");
  }

  create() {
    this.scene.start("Preloader");
  }
}
