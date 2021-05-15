import Menu from "./Menu";

var EnemiesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function EnemiesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
  confirm: function () {
    this.scene.events.emit("Enemy", this.menuItemIndex);
  },
});

export default EnemiesMenu;
