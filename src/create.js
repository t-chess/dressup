import gameState from "./gameState";

function create() {
  gameState.bg = this.add.sprite(640, 480, "bg").setPosition(320, 240);

  const addSet = (name, total, x, y) => {
    for (var i = 1; i <= total; i++) {
      name += i;
      gameState[name] = this.add.sprite(x, y, name);
      if (i !== 1) {
        gameState[name].visible = false;
      }
    }
  };

  // MOM
  gameState.mother = this.add.sprite(640, 480, "mother").setPosition(250, 248);
  addSet("hair", 5, 245, 95);

  // GAIL
  gameState.gail = this.add.sprite(640, 480, "gail").setPosition(380, 260);
  addSet("hand", 1, 320, 152);
  addSet("face", 1, 340, 95);

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
}

export default create;
