/* eslint-disable no-undef */

import Menu from './Menu';

const EnemiesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function EnemiesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
  confirm() {
    this.scene.events.emit('Enemy', this.menuItemIndex);
  },
});

export default EnemiesMenu;
