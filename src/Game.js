import gameState from "./gameState";
import phrases from "./phrases.json";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
  }
  create() {
    gameState.bg = this.add.sprite(640, 480, "bg").setPosition(320, 240);
    // left buttons
    this.hairbtn = this.add
      .sprite(640, 480, "hairbtn")
      .setPosition(80, 130)
      .setInteractive({ cursor: "pointer" });
    this.hairbtn.on("pointerdown", () => {
      this.onNavClicked("hair");
    });
    this.topsbtn = this.add
      .sprite(640, 480, "topsbtn")
      .setPosition(80, 230)
      .setInteractive({ cursor: "pointer" });
    this.topsbtn.on("pointerdown", () => {
      this.onNavClicked("top");
    });
    this.bottomsbtn = this.add
      .sprite(640, 480, "bottomsbtn")
      .setPosition(80, 330)
      .setInteractive({ cursor: "pointer" });
    this.bottomsbtn.on("pointerdown", () => {
      this.onNavClicked("bottom");
    });

    //

    // right panel
    this.rightPanel1 = this.add
      .sprite(640, 480, "rightpanel")
      .setPosition(560, 150);
    this.rightPanel2 = this.add
      .sprite(640, 480, "rightpanel")
      .setPosition(560, 310);
    this.arrowPrev = this.add
      .sprite(640, 480, "arrow")
      .setPosition(530, 410)
      .setFlipX(true)
      .setInteractive({ cursor: "pointer" });
    this.arrowNext = this.add
      .sprite(640, 480, "arrow")
      .setPosition(590, 410)
      .setInteractive({ cursor: "pointer" });

    this.arrowChangeChar = this.add
      .sprite(640, 480, "arrowgail")
      .setPosition(80, 410)
      // .setVisible(false)
      .setInteractive({ cursor: "pointer" });
    this.changeCharText = this.add
      .text(70, 410, "Gail", {
        font: "22px monospace",
        fill: "black",
      })
      .setOrigin(0.5, 0.5);

    const music = this.sound.add("music");
    music.loop = true;
    music.play();
    this.sound.pauseOnBlur = false;

    this.arrowNext.on("pointerdown", () => {
      let char = gameState.currentChar;
      let section = gameState.currentSection;
      let current = gameState[char][section];

      gameState[char + section + "preview" + current].visible = false;
      gameState[char + section + "preview" + (current + 1)].visible = false;

      let next =
        current + 2 < gameState[char][section + "total"] ? current + 2 : 1;
      gameState[char + section + "preview" + next].visible = true;
      gameState[char + section + "preview" + (next + 1)].visible = true;

      gameState[char][section] = next;

      if (!gameState.btnChangeChar && section === "bottom" && current == 3) {
        gameState.btnChangeChar = true;
        this.arrowChangeChar.visible = true;
      }
      this.checkChange("preview");
    });
    this.arrowPrev.on("pointerdown", () => {
      let char = gameState.currentChar;
      let section = gameState.currentSection;
      let current = gameState[char][section];

      gameState[char + section + "preview" + current].visible = false;
      gameState[char + section + "preview" + (current + 1)].visible = false;

      let prev =
        current === 1 ? gameState[char][section + "total"] - 1 : current - 2;
      gameState[char + section + "preview" + prev].visible = true;
      gameState[char + section + "preview" + (prev + 1)].visible = true;

      gameState[char][section] = prev;

      this.checkChange("preview");
    });

    this.arrowChangeChar.on("pointerdown", () => {
      let keys = Object.keys(gameState).filter((k) =>
        k.includes(gameState.currentChar + gameState.currentSection + "preview")
      );
      keys.forEach((k) => (gameState[k].visible = false));
      gameState.currentSection = null;
      this.changeCharText.setText(
        gameState.currentChar.charAt(0).toUpperCase() +
          gameState.currentChar.slice(1)
      );
      this.arrowChangeChar.setFlipX(!this.arrowChangeChar.flipX);
      gameState.currentChar = gameState.currentChar == "mom" ? "gail" : "mom";
      this.onNavClicked("hair");
      this.checkChange("preview");
    });

    // MOM
    this.mother = this.add.sprite(640, 480, "mother").setPosition(250, 248);
    this.addSet("mom", "bottom", 248, 345);
    this.addSet("mom", "top", 238, 285);
    this.addSet("mom", "hair", 238, 99);

    // GAIL
    this.abigail = this.add.sprite(640, 480, "abigail").setPosition(383, 258);
    this.addSet("gail", "hair", 346, 112);
    this.addSet("gail", "top", 387, 263);

    this.onNavClicked("hair");
  }
  addSet(who, what, x, y) {
    let name = who + what;
    let total = gameState[who][what + "total"];
    for (let i = 1; i <= total; i++) {
      gameState[name + i] = this.add.sprite(x, y, name + i);
      if (i !== 1) {
        gameState[name + i].visible = false;
      }
      gameState[name + "preview" + i] = this.add
        .sprite(560, i % 2 === 0 ? 310 : 150, name + "preview" + i)
        .setInteractive({ cursor: "pointer" });
      if (i > 2 || what !== "hair" || who !== "mom") {
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
      hair: this.hairbtn,
      top: this.topsbtn,
      bottom: this.bottomsbtn,
    };
    if (gameState.currentSection !== type) {
      let who = gameState.currentChar;
      if (gameState.currentSection) {
        let isEven = gameState[who][gameState.currentSection] % 2 === 0;
        gameState[
          who +
            gameState.currentSection +
            "preview" +
            gameState[who][gameState.currentSection]
        ].visible = false;
        let pair = gameState[who][gameState.currentSection] + (isEven ? -1 : 1);
        gameState[
          who + gameState.currentSection + "preview" + pair
        ].visible = false;
      }
      gameState.currentSection = type;
      let total = gameState[who][type + "total"];
      for (let i = 1; i <= total; i++) {
        gameState[who + type + "preview" + i].visible =
          i - gameState[who][type] <= 1 ? true : false;
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
