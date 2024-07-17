import gameState from "./gameState";

function create() {
  gameState.bg = this.add.sprite(640, 480, "bg").setPosition(320, 240);

  const addSet = (who, what, x, y, withPreview) => {
    let name = who + what;
    let total = gameState[who][what + "total"];
    for (let i = 1; i <= total; i++) {
      gameState[name + i] = this.add.sprite(x, y, name + i);
      if (i !== 1) {
        gameState[name + i].visible = false;
      }
      if (withPreview) {
        gameState[name + "preview" + i] = this.add
          .sprite(560, 220, name + "preview" + i)
          .setInteractive({ cursor: "pointer" });
        if (i !== 1 || what !== "hair") {
          gameState[name + "preview" + i].visible = false;
        }
        gameState[name + "preview" + i].on("pointerdown", () => {
          for (let r = 1; r <= total; r++) {
            gameState[who + what + r].visible = r === i ? true : false;
          }
        });
      }
    }
  };

  // left buttons
  const onNavClicked = (type) => {
    const buttons = {
      hair: gameState.hairbtn,
      top: gameState.topsbtn,
      bottom: gameState.bottomsbtn,
    };
    if (gameState.currentSection !== type) {
      let who = gameState.currentChar;
      if (gameState.currentSection) {
        gameState[
          who +
            gameState.currentSection +
            "preview" +
            gameState[who][gameState.currentSection]
        ].visible = false;
      }
      gameState.currentSection = type;
      let total = gameState[who][type + "total"];
      for (let i = 1; i <= total; i++) {
        gameState[who + type + "preview" + i].visible =
          i === gameState[who][type] ? true : false;
      }
    }
    Object.keys(buttons).forEach((section) => {
      buttons[section].preFX.clear();
      if (gameState.currentSection !== section) {
        buttons[section].preFX.addColorMatrix().negative();
      }
    });
  };
  gameState.hairbtn = this.add
    .sprite(640, 480, "hairbtn")
    .setPosition(80, 130)
    .setInteractive({ cursor: "pointer" });
  gameState.hairbtn.on("pointerdown", () => {
    onNavClicked("hair");
  });
  gameState.topsbtn = this.add
    .sprite(640, 480, "topsbtn")
    .setPosition(80, 240)
    .setInteractive({ cursor: "pointer" });
  gameState.topsbtn.on("pointerdown", () => {
    onNavClicked("top");
  });
  gameState.bottomsbtn = this.add
    .sprite(640, 480, "bottomsbtn")
    .setPosition(80, 350)
    .setInteractive({ cursor: "pointer" });
  gameState.bottomsbtn.on("pointerdown", () => {
    onNavClicked("bottom");
  });

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
    gameState[char + section + "preview" + current].visible = false;
    let next =
      current + 1 <= gameState[char][section + "total"] ? current + 1 : 1;
    gameState[char + section + "preview" + next].visible = true;
    gameState[char][section] = next;
    checkPreviewChange();
  });
  gameState.arrowPrev.on("pointerdown", () => {
    let char = gameState.currentChar;
    let section = gameState.currentSection;
    let current = gameState[char][section];

    gameState[char + section + "preview" + current].visible = false;
    let prev = current > 1 ? current - 1 : gameState[char][section + "total"];
    gameState[char + section + "preview" + prev].visible = true;
    gameState[char][section] = prev;
    checkPreviewChange();
  });

  const checkPreviewChange = () => {
    this.add.text(0, 0, "Test");
  };

  // MOM
  gameState.mother = this.add.sprite(640, 480, "mother").setPosition(250, 248);
  addSet("mom", "bottom", 214, 358, true);
  addSet("mom", "top", 236, 283, true);
  addSet("mom", "hair", 245, 95, true);

  // GAIL
  gameState.abigail = this.add
    .sprite(640, 480, "abigail")
    .setPosition(380, 260);
  addSet("gail", "hand", 320, 152);
  addSet("gail", "face", 340, 95);

  onNavClicked("hair");
}

export default create;
