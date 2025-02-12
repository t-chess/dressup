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

    // left side UI
    this.hairbtn = this.add.panel(20, 80, "md", 3, 2, "volossya", 20);
    this.hairbtn.onClick(() => {
      this.onNavClicked("hair");
    });
    this.topsbtn = this.add.panel(20, 160, "md", 3, 2, "Kofty", 20);
    this.topsbtn.onClick(() => {
      this.onNavClicked("top");
    });
    this.bottomsbtn = this.add.panel(20, 240, "md", 3, 2, "SHTANY", 20);
    this.bottomsbtn.onClick(() => {
      this.onNavClicked("bottom");
    });
    this.add.panel(20, 320, "md", 3, 2, "testik", 20);
    this.arrowgail = this.add.arrowpanel(20, 400, 6, "Gail");
    this.arrowgail.setVisible(false).onClick(()=>this.changeChar());
    this.arrowmom = this.add.arrowpanel(20, 400, 6, "Mom", "left");
    this.arrowmom.setVisible(false).onClick(()=>this.changeChar());
    //

    // right side UI
    this.add.panel(500, 80, "md", 3, 4).invertColors();
    this.add.panel(500, 240, "md", 3, 4).invertColors();

    this.add
      .sprite(530, 420, "ui_atlas", "arrow-solo")
      .setFlipX(true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => this.changePreview("prev"));
    this.add
      .sprite(590, 420, "ui_atlas", "arrow-solo")
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => this.changePreview("next"));

    this.add.soundbutton();

    this.add
      .sprite(550, 40, "ui_atlas","circle")
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        let next = gameState.bg + 1 > gameState.bgtotal ? 1 : gameState.bg + 1;
        this["bg" + gameState.bg].visible = false;
        this["bg" + next].visible = true;
        gameState.bg = next;
      });


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
      this.speechbox.setName("Gail");
      if (gameState.gailtop1._visible) {
        this.speechbox.run("This sweater doesn't feel appropriate for the occasion");
        return;
      }
      if (gameState.gailtop4._visible) {
        this.speechbox.run("Who the hell wears an old school uniform to a funeral?");
        return;
      }
      if (gameState.momtop5._visible && gameState.mombottom3._visible) {
        this.speechbox.run("I don't think mom would have understood this joke.");
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
        // this.rightPanel1,
        // this.rightPanel2,
        // this.hairbtn,
        // this.topsbtn,
        // this.bottomsbtn,
        // this.arrowNext,
        // this.arrowPrev,
        // this.arrowgail,
        // this.arrowmom,
        // this.btndone,
        // this.musicon,
        // this.musicoff,
        // this.bgbtn,
      ].forEach((el) => el.destroy());
      setTimeout(() => {
        this.speechbox.run("It seems we're ready.", undefined, ()=>this.speechbox.run("Just one last thing to do."));
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

    
    this.speechbox = this.add.speechbox();

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
  changePreview = (direction) => {
    const char = gameState.currentChar;
    const section = gameState.currentSection;
    const current = gameState[char][section];

    const total = gameState[char][section + "total"];
    const newIndex = direction === "next"
        ? (current + 2 < total ? current + 2 : 1)
        : (current === 1 ? total - 1 : current - 2);

    gameState[char + section + "preview" + current].visible = false;
    gameState[char + section + "preview" + (current + 1)].visible = false;
    gameState[char + section + "preview" + newIndex].visible = true;
    gameState[char + section + "preview" + (newIndex + 1)].visible = true;

    gameState[char][section] = newIndex;
    if (!gameState.btnChangeChar && section === "bottom" && current === 1) {
        gameState.btnChangeChar = true;
        this.arrowgail.visible = true;
    }
    this.checkChange("preview");
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
        const arr = ph.text.map(str=>({character:ph.who,text:str}));
        this.speechbox.playDialogSequence(arr);
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
      buttons[section].invertColors(gameState.currentSection===section?'on':'off');
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
  changeChar() {
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
  }
  initHand() {
    this.hand = this.add
      .sprite(640, 480, "hand")
      .setPosition(330, 65)
      .setInteractive({ cursor: "pointer" });
    this.hand.on("pointerdown", () => {
      this.hand.setInteractive(false);
      // gameState.musicPause = {
      //   play: this.music.isPlaying,
      //   time: this.music.seek,
      // };
      // this.music.stop();
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
