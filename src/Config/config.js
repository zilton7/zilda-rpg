import "phaser";

export default {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  pixelArt: true,
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};
