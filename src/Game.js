import gameState from "./gameState";
import phrases from "./phrases.json";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
  }
  create() {
    gameState.bg = this.add.sprite(640, 480, "bg").setPosition(320, 240);
    // left buttons
    gameState.hairbtn = this.add
      .sprite(640, 480, "hairbtn")
      .setPosition(80, 130)
      .setInteractive({ cursor: "pointer" });
    gameState.hairbtn.on("pointerdown", () => {
      this.onNavClicked("hair");
    });
    gameState.topsbtn = this.add
      .sprite(640, 480, "topsbtn")
      .setPosition(80, 240)
      .setInteractive({ cursor: "pointer" });
    gameState.topsbtn.on("pointerdown", () => {
      this.onNavClicked("top");
    });
    gameState.bottomsbtn = this.add
      .sprite(640, 480, "bottomsbtn")
      .setPosition(80, 350)
      .setInteractive({ cursor: "pointer" });
    gameState.bottomsbtn.on("pointerdown", () => {
      this.onNavClicked("bottom");
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

    gameState.arrowGail = this.add
      .sprite(640, 480, "arrowgail")
      .setPosition(560, 425)
      .setVisible(false)
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
      if (!gameState.showGailBtn && section === "bottom" && current == 1) {
        gameState.arrowGail.visible = true;
      }
      this.checkChange("preview");
    });
    gameState.arrowPrev.on("pointerdown", () => {
      let char = gameState.currentChar;
      let section = gameState.currentSection;
      let current = gameState[char][section];

      gameState[char + section + "preview" + current].visible = false;
      let prev = current > 1 ? current - 1 : gameState[char][section + "total"];
      gameState[char + section + "preview" + prev].visible = true;
      gameState[char][section] = prev;
      this.checkChange("preview");
    });

    gameState.arrowGail.on("pointerdown", () => {
      gameState.currentChar = "gail";
      this.onNavClicked("hair");
      this.checkChange("preview");
    });

    // MOM
    gameState.mother = this.add
      .sprite(640, 480, "mother")
      .setPosition(250, 248);
    this.addSet("mom", "bottom", 214, 358, true);
    this.addSet("mom", "top", 236, 283, true);
    this.addSet("mom", "hair", 245, 95, true);

    // GAIL
    gameState.abigail = this.add
      .sprite(640, 480, "abigail")
      .setPosition(380, 260);
    this.addSet("gail", "hand", 320, 152);
    this.addSet("gail", "face", 340, 95);
    this.addSet("gail", "hair", 346, 112);

    this.onNavClicked("hair");
  }
  addSet(who, what, x, y, withPreview) {
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
          this.checkChange("click");
        });
      }
    }
  }
  checkChange(type) {
    phrases[type].forEach((ph) => {
      let show;
      if (type === "preview") {
        if (gameState[ph.who + ph.condition]._visible) {
          show = true;
        }
      } else {
        if (
          ph.who === gameState.currentChar &&
          ph.on.replace(/[0-9]/g, "") === gameState.currentSection &&
          gameState[ph.who + ph.on]._visible
        ) {
          show = true;
        }
      }
      if (show) {
        let count = ph.qty ? ph.qty : 1;
        for (let i = 0; i < count; i++) {
          // butiful text rendering
          let styleObject = {
            backgroundColor: "black",
            color: "white",
          };
          const addText = (index) => {
            if (index >= ph.text.length) {
              return;
            }
            let tempText = this.add.text(0, 0, ph.text[index], styleObject);
            let textWidth = tempText.width;
            let textHeight = tempText.height;
            tempText.destroy();
            let x = Phaser.Math.Between(0, 640 - textWidth);
            let y = Phaser.Math.Between(0, 480 - textHeight);
            let textik = this.add.text(x, y, ph.text[index], styleObject);
            setTimeout(() => {
              textik.destroy();
            }, 10000);
            setTimeout(() => {
              addText(index + 1);
            }, 3000);
          };
          addText(0);
          //
        }
      }
    });
  }
  onNavClicked(type) {
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
    this.checkChange("preview");
  }
}

export default Game;
