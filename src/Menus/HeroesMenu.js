/* eslint-disable no-undef */

import Menu from './Menu';

const HeroesMenu = new Phaser.Class({
  Extends: Menu,

  initialize: function HeroesMenu(x, y, scene) {
    Menu.call(this, x, y, scene);
  },
});

export default HeroesMenu;
