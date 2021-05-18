/* eslint-disable no-undef */

import Menu from './Menu';

const ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function ActionsMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
    this.addMenuItem('Attack');
  },
  confirm() {
    this.scene.events.emit('SelectedAction');
  },
});

export default ActionsMenu;
