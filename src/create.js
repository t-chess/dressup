import gameState from "./gameState";

function create() {
  gameState.bg = this.add.sprite(640, 480, "bg").setPosition(320, 240);

  const addSet = (who, what, x, y) => {
    let name = who + what;
    let total = gameState[who][what + "total"];
    for (var i = 1; i <= total; i++) {
      gameState[name + i] = this.add.sprite(x, y, name + i);
      if (i !== 1) {
        gameState[name + i].visible = false;
      }
    }
  };

  // MOM
  gameState.mother = this.add.sprite(640, 480, "mother").setPosition(250, 248);
  addSet("mom", "bottom", 214, 358);
  addSet("mom", "top", 236, 283);
  addSet("mom", "hair", 245, 95);

  // GAIL
  gameState.abigail = this.add
    .sprite(640, 480, "abigail")
    .setPosition(380, 260);
  addSet("gail", "hand", 320, 152);
  addSet("gail", "face", 340, 95);

  // left buttons
  const updateButtons = () => {
    const buttons = {
      hair: gameState.hairbtn,
      top: gameState.topsbtn,
      bottom: gameState.bottomsbtn,
    };

    Object.keys(buttons).forEach((section) => {
      buttons[section].preFX.clear();
      if (gameState.currentSection === section) {
        buttons[section].preFX.addColorMatrix().negative();
      }
    });
  };
  gameState.hairbtn = this.add
    .sprite(640, 480, "hairbtn")
    .setPosition(80, 130)
    .setInteractive({ cursor: "pointer" });
  gameState.hairbtn.on("pointerdown", () => {
    gameState.currentSection = "hair";
    updateButtons();
  });
  gameState.topsbtn = this.add
    .sprite(640, 480, "topsbtn")
    .setPosition(80, 240)
    .setInteractive({ cursor: "pointer" });
  gameState.topsbtn.on("pointerdown", () => {
    gameState.currentSection = "top";
    updateButtons();
  });
  gameState.bottomsbtn = this.add
    .sprite(640, 480, "bottomsbtn")
    .setPosition(80, 350)
    .setInteractive({ cursor: "pointer" });
  gameState.bottomsbtn.on("pointerdown", () => {
    gameState.currentSection = "bottom";
    updateButtons();
  });
  updateButtons();

  //

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
    let char = gameState.currentChar;
    let section = gameState.currentSection;
    let current = gameState[char][section];
    gameState[char + section + current].visible = false;
    let next =
      current + 1 <= gameState[char][section + "total"] ? current + 1 : 1;
    gameState[char + section + next].visible = true;
    gameState[char][section] = next;
  });
  gameState.arrowPrev.on("pointerdown", () => {
    let char = gameState.currentChar;
    let section = gameState.currentSection;
    let current = gameState[char][section];

    gameState[char + section + current].visible = false;
    let prev = current > 1 ? current - 1 : gameState[char][section + "total"];
    gameState[char + section + prev].visible = true;
    gameState[char][section] = prev;
  });
}

export default create;
