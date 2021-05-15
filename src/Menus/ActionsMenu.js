import Menu from "./Menu";

var ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function ActionsMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
    this.addMenuItem("Attack");
  },
  confirm: function () {
    this.scene.events.emit("SelectedAction");
  },
});

export default ActionsMenu;
