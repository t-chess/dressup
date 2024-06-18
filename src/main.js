import Phaser from "phaser";

export const gameInfo = {
  totalHands: 1,
  totalFaces: 1,
};
export const gameState = {
  currentHand: 1,
};

function updateEyeColor(color) {
  gameState.currentEyeColor = color;
  gameState[gameState.currentEyes].tint = gameState.currentEyeColor;
  // change eye color of all eyes and eye buttons
  for (var i = 1; i <= gameInfo.totalHands; i++) {
    let name = "hand" + i;
    gameState[name].tint = gameState.currentEyeColor;
    gameState[name + "Button"].tint = gameState.currentEyeColor;
  }
}

function preload() {
  // bg and bodies
  this.load.image("bg", "assets/bg.png");
  this.load.image("mother", "assets/mom.png");
  this.load.image("gail", "assets/gail.png");

  // interface
  this.load.image("hairbtn", "assets/interface/hairbtn.png");
  this.load.image("topsbtn", "assets/interface/topsbtn.png");
  this.load.image("bottomsbtn", "assets/interface/bottomsbtn.png");
  this.load.image("rightpanel", "assets/interface/rightpanel.png");
  this.load.image("arrow", "assets/interface/arrow.png");

  // Gail HANDS
  for (var i = 1; i <= gameInfo.totalHands; i++) {
    this.load.image("hand" + i, "assets/gail/body/hand" + i + ".png");
  }
  // Gail FACES
  for (var i = 1; i <= gameInfo.totalFaces; i++) {
    this.load.image("face" + i, "assets/gail/body/face" + i + ".png");
  }
}

function create() {
  // bg
  gameState.bg = this.add.sprite(640, 480, "bg").setPosition(320, 240);
  // mom
  gameState.mother = this.add.sprite(640, 480, "mother").setPosition(250, 248);
  // Gail
  gameState.gail = this.add.sprite(640, 480, "gail").setPosition(380, 260);

  // left buttons
  gameState.hairbtn = this.add
    .sprite(640, 480, "hairbtn")
    .setPosition(80, 130)
    .setInteractive({ cursor: "pointer" });
  gameState.hairbtn.on("pointerdown", () => {
    console.log("Hair button clicked");
    // Add logic to handle hair button click
  });
  gameState.topsbtn = this.add
    .sprite(640, 480, "topsbtn")
    .setPosition(80, 240)
    .setInteractive({ cursor: "pointer" });
  gameState.topsbtn.on("pointerdown", () => {
    console.log("Tops button clicked");
    // Add logic to handle hair button click
  });
  gameState.bottomsbtn = this.add
    .sprite(640, 480, "bottomsbtn")
    .setPosition(80, 350)
    .setInteractive({ cursor: "pointer" });
  gameState.bottomsbtn.on("pointerdown", () => {
    console.log("Bottoms button clicked");
    // Add logic to handle hair button click
  });

  // right panel
  gameState.rightPanel = this.add
    .sprite(640, 480, "rightpanel")
    .setPosition(560, 220);
  gameState.arrowPrev = this.add
    .sprite(640, 480, "arrow")
    .setPosition(530, 370)
    .setFlipX(true)
    .setInteractive({ cursor: "pointer" });
  gameState.arrowNext = this.add
    .sprite(640, 480, "arrow")
    .setPosition(590, 370)
    .setInteractive({ cursor: "pointer" });
  gameState.arrowNext.on("pointerdown", () => {
    console.log("arrowNext clicked");
    // Add logic to handle hair button click
  });
  gameState.arrowPrev.on("pointerdown", () => {
    console.log("arrowPrev clicked");
    // Add logic to handle hair button click
  });

  // Hands
  for (var i = 1; i <= gameInfo.totalHands; i++) {
    let name = "hand" + i;
    gameState[name] = this.add.sprite(320, 152, name);
  }
  // Faces
  for (var i = 1; i <= gameInfo.totalFaces; i++) {
    let name = "face" + i;
    gameState[name] = this.add.sprite(340, 95, name);
  }
}

function update() {}

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  backgroundColor: "#5f2a55",
  parent: "container",
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
