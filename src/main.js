import Phaser from "phaser";

const gameState = {
  totalEyes: 9,
  currentEyes: "eyes1",
  visibleEyesStart: 1,
  palette: [0xa7f66c, 0x844cc5, 0x66e2e2, 0x4c7df3, 0xffc836, 0xec32fc],
  currentEyeColor: 0xffffff,
};

function updateEyeColor(color) {
  gameState.currentEyeColor = color;
  gameState[gameState.currentEyes].tint = gameState.currentEyeColor;
  // change eye color of all eyes and eye buttons
  for (var i = 1; i <= gameState.totalEyes; i++) {
    let name = "eyes" + i;
    gameState[name].tint = gameState.currentEyeColor;
    gameState[name + "Button"].tint = gameState.currentEyeColor;
  }
}

function preload() {
  // Load body PNG
  this.load.image("body", "assets/sprite.png");
  // Load eyes from /assets/eyes/
  for (var i = 1; i <= gameState.totalEyes; i++) {
    this.load.image("eyes" + i, "assets/eyes/eyes" + i + ".png");
  }
  // Load left arrow button PNG
  this.load.image("leftArrowButton", "assets/buttons/leftArrowButton.png");
}

function create() {
  /* Body */
  gameState.sprite = this.add.sprite(500, 500, "body");
  gameState.sprite.setInteractive();

  /* Arrow buttons */
  // Left
  gameState.leftArrowButton = this.add.sprite(780, 300, "leftArrowButton");
  gameState.leftArrowButton.setInteractive();
  // Right
  gameState.rightArrowButton = this.add.sprite(1220, 300, "leftArrowButton");
  gameState.rightArrowButton.flipX = true;
  gameState.rightArrowButton.setInteractive();

  /* Set up section for eye options (buttons) */
  let chooseEyesText = this.add.text(880, 150, "Choose Eyes:", {
    fontFamily: '"Roboto Condensed"',
    fontSize: "40px",
  });
  let eyesBox = this.add.rectangle(1000, 300, 400, 200, 0x37c3be); // rectangle(x, y, width, height, color)

  /* Eye Colors */
  let chooseEyeColorText = this.add.text(780, 430, "Choose Eye Color:", {
    fontFamily: '"Roboto Condensed"',
    fontSize: "40px",
  });
  let eyeColorBox = this.add.rectangle(925, 510, 110, 70, 0x37c3be);
  gameState.colorCircle1 = this.add.circle(900, 512, 22, 0xa7f66c);
  gameState.colorCircle1.setInteractive();

  gameState.colorCircle2 = this.add.circle(950, 512, 22, 0x844cc5);
  gameState.colorCircle2.setInteractive();

  let y = 250;
  let x = 900;
  var j = 0;
  for (var i = 1; i <= gameState.totalEyes; i++) {
    /* Create sprite for eye, position on the body sprite */
    let name = "eyes" + i;
    gameState[name] = this.add.sprite(510, 260, name);
    gameState[name].tint = gameState.currentEyeColor;
    // set sprite as interactive
    gameState[name].setInteractive();
    if (gameState.currentEyes !== name) {
      gameState[name].visible = false;
    }

    if (j == 2) {
      x = 900;
      y = 350;
      j = -1;
    }
    if ((i - 1) % 4 == 0) {
      x = 900;
      y = 250;
      j = 0;
    }

    j += 1;

    /* Eye button (for selection) */
    gameState[name + "Button"] = this.add.sprite(x, y, name).setScale(0.5);
    gameState[name + "Button"].tint = gameState.currentEyeColor;
    // hide button if i > 4
    if (i > 4) {
      gameState[name + "Button"].visible = false;
    }
    // set button as interactive
    gameState[name + "Button"].setInteractive();
    x += 170;

    /* Add functionality to eye button */
    gameState[name + "Button"].on("pointerover", function () {
      gameState[name + "Button"].tint = 0xffff33;
    });
    gameState[name + "Button"].on("pointerout", function () {
      gameState[name + "Button"].tint = gameState.currentEyeColor;
    });
    gameState[name + "Button"].on("pointerdown", function () {
      // Hide current eye
      gameState[gameState.currentEyes].visible = false;
      // Show selected eye
      gameState[name].visible = true;
      // Update value of gameState.currentEyes
      gameState.currentEyes = name;
    });
  }

  /* Change eye color */
  // Color Circle 1
  gameState.colorCircle1.on("pointerup", function () {
    updateEyeColor(gameState.colorCircle1.fillColor);
  });
  // Color Circle 2
  gameState.colorCircle2.on("pointerup", function () {
    updateEyeColor(gameState.colorCircle2.fillColor);
  });

  gameState.sprite.on("pointerup", function () {
    gameState.sprite.tint = 0xffe6cc;
  });

  // Left and Right arrow functionality
  gameState.leftArrowButton.on("pointerdown", function () {
    if (gameState.visibleEyesStart >= 5) {
      // hide current eye buttons
      let name;
      for (
        var i = gameState.visibleEyesStart;
        i < gameState.visibleEyesStart + 4 && i <= gameState.totalEyes;
        i++
      ) {
        name = "eyes" + i;
        gameState[name + "Button"].visible = false;
      }
      // determine eye buttons to show
      for (
        var i = gameState.visibleEyesStart - 4;
        i < gameState.visibleEyesStart && i <= gameState.totalEyes;
        i++
      ) {
        name = "eyes" + i;
        gameState[name + "Button"].visible = true;
      }
      gameState.visibleEyesStart -= 4;
    }
  });
  gameState.rightArrowButton.on("pointerdown", function () {
    // console.log(gameState.visibleEyesStart);
    if (gameState.visibleEyesStart + 3 < gameState.totalEyes) {
      // hide current eye buttons
      let name;
      for (
        var i = gameState.visibleEyesStart;
        i < gameState.visibleEyesStart + 4 && i <= gameState.totalEyes;
        i++
      ) {
        name = "eyes" + i;
        gameState[name + "Button"].visible = false;
      }
      // determine eye buttons to show
      for (
        var i = gameState.visibleEyesStart + 4;
        i < gameState.visibleEyesStart + 8 && i <= gameState.totalEyes;
        i++
      ) {
        name = "eyes" + i;
        gameState[name + "Button"].visible = true;
      }
      gameState.visibleEyesStart += 4;
    }
  });
}

function update() {}

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 300,
  backgroundColor: "#5f2a55",
  parent: "container",
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
