import PlayerCharacter from "../Objects/PlayerCharacter";
import Enemy from "../Objects/Enemy";
import Menu from "../Menus/Menu";

var BattleScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function BattleScene() {
    Phaser.Scene.call(this, { key: "BattleScene" });
  },
  create: function () {
    // change the background to green
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    this.startBattle();
    // on wake event we call startBattle too
    this.sys.events.on("wake", this.startBattle, this);
  },
  nextTurn: function () {
    // if we have victory or game over
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      // currently active unit
      this.index++;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      // we need the player to select action and then enemy
      this.events.emit("PlayerSelect", this.index);
    } else {
      // else if its enemy unit
      // pick random living hero to be attacked
      var r;
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

  checkEndBattle: function () {
    var victory = true;
    // if all enemies are dead we have victory
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].living) victory = false;
    }
    var gameOver = true;
    // if all heroes are dead we have game over
    for (var i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].living) gameOver = false;
    }
    return victory || gameOver;
  },

  endBattle: function () {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (var i = 0; i < this.units.length; i++) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
    // sleep the UI
    this.scene.sleep("UIScene");
    // return to WorldScene and sleep current BattleScene
    this.scene.switch("WorldScene");
  },

  startBattle: function () {
    // player character - warrior
    var warrior = new PlayerCharacter(
      this,
      250,
      50,
      "player",
      1,
      "Warrior",
      100,
      20
    );
    this.add.existing(warrior);

    // player character - mage
    var mage = new PlayerCharacter(this, 250, 100, "player", 4, "Mage", 80, 8);
    this.add.existing(mage);

    var dragonblue = new Enemy(
      this,
      50,
      50,
      "dragonblue",
      null,
      "Dragon",
      50,
      3
    );
    this.add.existing(dragonblue);

    var dragonOrange = new Enemy(
      this,
      50,
      100,
      "dragonorrange",
      null,
      "Dragon2",
      50,
      3
    );
    this.add.existing(dragonOrange);

    // array with heroes
    this.heroes = [warrior, mage];
    // array with enemies
    this.enemies = [dragonblue, dragonOrange];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1; // currently active unit

    this.scene.run("UIScene");
  },

  receivePlayerSelection: function (action, target) {
    if (action == "attack") {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this,
    });
  },
});

export default BattleScene;
