import gameState from "../gameState";
import phrases from "../phrases.json";

export default class Main extends Phaser.Scene {
  constructor() {
    super("Main");
  }
  create() {
    Array.from({ length: gameState.bgtotal }, (_, i) => i + 1).forEach((i) => {
      this["bg" + i] = this.add
        .sprite(640, 480, "bg" + i)
        .setVisible(i > 1 ? false : true)
        .setPosition(320, 240);
    });
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
    this.bgbtn = this.add
      .sprite(640, 480, "bgbtn")
      .setPosition(530, 50)
      .setInteractive({ cursor: "pointer" });
    this.musicon = this.add
      .sprite(640, 480, "musicon")
      .setPosition(590, 50)
      .setInteractive({ cursor: "pointer" });
    this.musicoff = this.add
      .sprite(640, 480, "musicoff")
      .setVisible(false)
      .setPosition(590, 50)
      .setInteractive({ cursor: "pointer" });

    this.arrowgail = this.add
      .sprite(640, 480, "arrowgail")
      .setPosition(80, 410)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });
    this.arrowmom = this.add
      .sprite(640, 480, "arrowmom")
      .setPosition(80, 410)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });

    this.music = this.sound.add("music");
    this.music.loop = true;
    this.music.play();
    this.sound.pauseOnBlur = false;
    this.musicoff.on("pointerdown", () => {
      this.music.resume();
      this.musicoff.visible = false;
      this.musicon.visible = true;
    });
    this.musicon.on("pointerdown", () => {
      this.music.pause();
      this.musicoff.visible = true;
      this.musicon.visible = false;
    });

    this.bgbtn.on("pointerdown", () => {
      let next = gameState.bg + 1 > gameState.bgtotal ? 1 : gameState.bg + 1;
      this["bg" + gameState.bg].visible = false;
      this["bg" + next].visible = true;
      gameState.bg = next;
    });

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

      if (!gameState.btnChangeChar && section === "bottom" && current == 1) {
        gameState.btnChangeChar = true;
        this.arrowgail.visible = true;
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

      if (!gameState.btnChangeChar && section === "bottom" && current == 1) {
        gameState.btnChangeChar = true;
        this.arrowgail.visible = true;
      }

      this.checkChange("preview");
    });

    const changeChar = () => {
      let keys = Object.keys(gameState).filter((k) =>
        k.includes(gameState.currentChar + gameState.currentSection + "preview")
      );
      keys.forEach((k) => (gameState[k].visible = false));
      gameState.currentSection = null;
      this["arrow" + gameState.currentChar].visible = true;
      gameState.currentChar = gameState.currentChar == "mom" ? "gail" : "mom";
      this["arrow" + gameState.currentChar].visible = false;
      this.onNavClicked("hair");
      this.checkChange("preview");
    };
    this.arrowgail.on("pointerdown", changeChar);
    this.arrowmom.on("pointerdown", changeChar);

    // MOM
    this.mother = this.add.sprite(640, 480, "mother").setPosition(250, 248);
    this.eyes = this.add
      .sprite(640, 480, "eyes")
      .setPosition(261, 73)
      .setVisible(false);
    this.addSet("mom", "bottom", 248, 345);
    this.addSet("mom", "top", 238, 285);
    this.addSet("mom", "hair", 238, 99);

    // GAIL
    this.abigail = this.add.sprite(640, 480, "abigail").setPosition(383, 258);
    this.addSet("gail", "bottom", 371, 309);
    this.addSet("gail", "top", 389, 261);
    this.addSet("gail", "hair", 346, 112);

    this.btndone = this.add
      .sprite(640, 480, "btndone")
      .setPosition(320, 410)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });

    this.btndone.on("pointerdown", () => {
      if (gameState.gailtop1._visible) {
        this.addText(
          ["This sweater doesn't feel appropriate for the occasion"],
          0
        );
        return;
      }
      if (gameState.gailtop4._visible) {
        this.addText(
          ["Who the hell wears an old school uniform to a funeral?"],
          0
        );
        return;
      }
      if (gameState.momtop5._visible && gameState.mombottom3._visible) {
        this.addText(["I don't think mom would have understood this joke."], 0);
        return;
      }
      Object.keys(gameState)
        .filter((k) => k.includes("preview"))
        .forEach((k) => {
          gameState[k].destroy();
          delete gameState[k];
        });
      gameState.chosenItems = Object.keys(gameState)
        .filter((k) => k.includes("gail") || k.includes("mom"))
        .filter((k) => gameState[k]._visible === true);
      [
        this.rightPanel1,
        this.rightPanel2,
        this.hairbtn,
        this.topsbtn,
        this.bottomsbtn,
        this.arrowNext,
        this.arrowPrev,
        this.arrowgail,
        this.arrowmom,
        this.btndone,
        this.musicon,
        this.musicoff,
        this.bgbtn,
      ].forEach((el) => el.destroy());
      setTimeout(() => {
        this.addText(["It seems we're ready", "just one last thing to do"], 0);
        setTimeout(() => {
          this.abigail.destroy();
          Object.keys(gameState)
            .filter((k) => k.includes("gail") && gameState[k].type === "Sprite")
            .forEach((k) => {
              gameState[k].destroy();
              delete gameState[k];
            });
          setTimeout(() => {
            this.initHand();
          }, 500);
        }, 7000);
      }, 2000);
    });

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
          gameState[who + what + r].chosen = r === i ? true : false;
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
          this.addText(ph.text, 0);
        }
      }
    });
  }
  addText(textArray, index) {
    if (index >= textArray.length) {
      return;
    }
    let styleObject = {
      backgroundColor: "black",
      color: "white",
    };
    let tempText = this.add.text(0, 0, textArray[index], styleObject);
    let textWidth = tempText.width;
    let textHeight = tempText.height;
    tempText.destroy();
    let x = Phaser.Math.Between(0, 640 - textWidth);
    let y = Phaser.Math.Between(0, 480 - textHeight);
    let textik = this.add.text(x, y, textArray[index], styleObject);
    setTimeout(() => {
      textik.destroy();
    }, 8000);
    setTimeout(() => {
      this.addText(textArray, index + 1);
    }, 3000);
  }
  onNavClicked(type) {
    const buttons = {
      hair: this.hairbtn,
      top: this.topsbtn,
      bottom: this.bottomsbtn,
    };
    if (gameState.currentSection !== type) {
      let who = gameState.currentChar;
      let keys = Object.keys(gameState).filter((k) =>
        k.includes(gameState.currentChar + gameState.currentSection + "preview")
      );
      keys.forEach((k) => (gameState[k].visible = false));
      gameState.currentSection = type;
      let current = gameState[who][type];
      gameState[who + type + "preview" + current].visible = true;
      gameState[who + type + "preview" + (current + 1)].visible = true;
    }
    Object.keys(buttons).forEach((section) => {
      buttons[section].preFX.clear();
      if (gameState.currentSection !== section) {
        buttons[section].preFX.addColorMatrix().negative();
      }
    });
    if (
      !gameState.btnDone &&
      gameState.currentChar === "gail" &&
      gameState.currentSection === "bottom"
    ) {
      gameState.btnDone = true;
      this.btndone.visible = true;
    }
    this.checkChange("preview");
  }
  initHand() {
    this.hand = this.add
      .sprite(640, 480, "hand")
      .setPosition(330, 65)
      .setInteractive({ cursor: "pointer" });
    this.hand.on("pointerdown", () => {
      this.hand.setInteractive(false);
      gameState.musicPause = {
        play: this.music.isPlaying,
        time: this.music.seek,
      };
      console.log(gameState.musicPause);
      this.music.stop();
      this.tweens.add({
        targets: this.hand,
        x: this.hand.x - 50,
        duration: 600,
      });
      setTimeout(() => {
        this.tweens.add({
          targets: this.hand,
          y: this.hand.y + 20,
          duration: 400,
        });
        this.eyes.visible = true;
      }, 1000);
      setTimeout(() => {
        this.tweens.add({
          targets: this.hand,
          x: this.hand.x + 50,
          duration: 1000,
          onComplete: () => {
            setTimeout(() => {
              this.scene.start("Ending");
            }, 1000);
          },
        });
      }, 2000);
    });
  }
}
