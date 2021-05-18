/* eslint-disable no-undef */

import PlayerCharacter from '../Objects/PlayerCharacter';
import Enemy from '../Objects/Enemy';
import { getPlayerScore, updateScoreText } from '../Score/PlayerScore';

let scoreText;
let warrior;
let mage;
let dragonBlue;
let dragonOrange;

const BattleScene = new Phaser.Class({
  Extends: Phaser.Scene,

  preload() {
    // Add background image
    this.load.image('battleBg', 'assets/battle_bg.jpg');
  },

  initialize: function BattleScene() {
    Phaser.Scene.call(this, { key: 'BattleScene' });
  },
  create() {
    // Add background
    this.add.image(0, 0, 'battleBg').setOrigin(0).setScale(0.52).setY(50);
    // Display Score
    scoreText = this.add.text(16, 16, `score: ${getPlayerScore()}`, {
      fontSize: '16px',
      fill: '#fff',
    });
    updateScoreText(scoreText);

    // Add dark Box
    this.add.rectangle(410, 300, 400, 350, 0x000000).setAlpha(0.9);

    this.startBattle();
    // on wake event we call startBattle too
    this.sys.events.on('wake', this.startBattle, this);
  },

  nextTurn() {
    // if we have victory or game over
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      // Update health bars
      this.setHealthBarValue(this.warriorHealthBar, warrior.hp);
      this.setHealthBarValue(this.mageHealthBar, mage.hp);
      this.setHealthBarValue(this.dragonBlueHealthBar, dragonBlue.hp);
      this.setHealthBarValue(this.dragonOrangeHealthBar, dragonOrange.hp);

      // currently active unit
      this.index += 1;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      // we need the player to select action and then enemy
      this.events.emit('PlayerSelect', this.index);
    } else {
      // else if its enemy unit
      // pick random living hero to be attacked
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      // call the enemy's attack function
      this.units[this.index].attack(this.heroes[r]);
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({
        delay: 3000,
        callback: this.nextTurn,
        callbackScope: this,
      });
    }
  },

  checkEndBattle() {
    let victory = true;
    // if all enemies are dead we have victory
    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) victory = false;
    }
    let gameOver = true;
    // if all heroes are dead we have game over
    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) gameOver = false;
    }
    return victory || gameOver;
  },

  endBattle() {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i += 1) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.sleep('UIScene');
    // return to WorldScene and sleep current BattleScene
    this.scene.switch('WorldScene');
  },

  startBattle() {
    // player character - warrior
    warrior = new PlayerCharacter(
      this,
      530,
      200,
      'player',
      1,
      'Warrior',
      100,
      20,
    );
    this.add.existing(warrior);
    this.warriorHealthBar = this.makeHealthBar(480, 220, 0x2ecc71);
    this.setHealthBarValue(this.warriorHealthBar, 100);

    // player character - mage
    mage = new PlayerCharacter(this, 530, 250, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);
    this.mageHealthBar = this.makeHealthBar(480, 270, 0x2ecc71);
    this.setHealthBarValue(this.mageHealthBar, 100);

    //  enemy - dragon blue
    dragonBlue = new Enemy(
      this,
      290,
      200,
      'dragonBlue',
      null,
      'BlueDrag',
      50,
      3,
    );
    this.add.existing(dragonBlue);
    this.dragonBlueHealthBar = this.makeHealthBar(260, 220, 0x2ecc71);
    this.setHealthBarValue(this.dragonBlueHealthBar, 100);

    //  enemy - dragon orange
    dragonOrange = new Enemy(
      this,
      290,
      250,
      'dragonOrange',
      null,
      'OrangeDrag',
      50,
      3,
    );
    this.add.existing(dragonOrange);
    this.dragonOrangeHealthBar = this.makeHealthBar(260, 270, 0x2ecc71);
    this.setHealthBarValue(this.dragonOrangeHealthBar, 100);

    // array with heroes
    this.heroes = [warrior, mage];
    // array with enemies
    this.enemies = [dragonBlue, dragonOrange];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1; // currently active unit

    this.scene.run('UIScene');
  },

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  },

  makeHealthBar(x, y, color) {
    // draw the bar
    const bar = this.add.graphics();

    // color the bar
    bar.fillStyle(color, 1);

    // fill the bar with a rectangle
    bar.fillRect(0, 0, 100, 10);

    // position the bar
    bar.x = x;
    bar.y = y;

    // return the bar
    return bar;
  },
  setHealthBarValue(bar, percentage) {
    // scale the bar
    bar.scaleX = percentage / 100;
  },
});

export default BattleScene;
