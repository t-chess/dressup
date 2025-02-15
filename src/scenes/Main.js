import phrases from "../phrases.json";

export default class Main extends Phaser.Scene {
  constructor() {
    super("Main");
    this.gameState = {
      currentChar: "mom",
      currentSection: "",
      bg: 0,
      bgtotal: 4,
      mom: {
        hair:0, hairpreview:0, hairtotal: 12,
        top:0, toppreview:0, toptotal: 10,
        bottom:0, bottompreview:0, bottomtotal: 6,
      },
      gail: {
        hair:0, hairpreview:0, hairtotal: 4,
        top:0, toppreview:0, toptotal: 6,
        bottom:0, bottompreview:0, bottomtotal: 2,
      }

    }
  }
  create() {
    Array.from({ length: 4 }, (_, i) => i + 1).forEach((i) => {
      this["bg" + i] = this.add
        .sprite(640, 480, "bg" + i)
        .setVisible(i > 1 ? false : true)
        .setPosition(320, 240);
    });

    // left side UI
    this.hairbtn = this.add.panel(20, 80, "md", 3, 2, "Hair", 20).onClick(() => {
      this.onNavClicked("hair");
    });
    this.topbtn = this.add.panel(20, 160, "md", 3, 2, "Tops", 20).onClick(() => {
      this.onNavClicked("top");
    });
    this.bottombtn = this.add.panel(20, 240, "md", 3, 2, "Bottoms", 18).onClick(() => {
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

    // MOM
    this.add.sprite(640, 480, "mother").setPosition(250, 248);
    this.eyes = this.add
      .sprite(640, 480, "eyes")
      .setPosition(261, 73)
      .setVisible(false);
    
    // ("mom", "bottom", 248, 345);
    this.momtop = this.add.image(240, 284,'momtop',0);
    this.momhair = this.add.image(239, 99,'momhair',0);

    // GAIL
    this.abigail = this.add.sprite(640, 480, "abigail").setPosition(383, 258);
    // ("gail", "bottom", 371, 309);
    // ("gail", "top", 389, 261);
    // ("gail", "hair", 346, 112);

    this.previews = {
      momhairt: this.add.image(555, 150,'momhair',0).setScale(0.7),
      momhairb: this.add.image(555, 310,'momhair',1).setScale(0.7),
      momtopt: this.add.image(555, 200,'momtop',0).setCrop(0,0,216,200).setScale(0.6),
      momtopb: this.add.image(555, 360,'momtop',1).setCrop(0,0,216,200).setScale(0.6),
    };
    Object.keys(this.previews).forEach((k) => {
      this.previews[k].setInteractive({ cursor: "pointer" });
      this.previews[k].setVisible(false);
      this.previews[k].on('pointerdown', ()=>this.onPreviewClick(k.endsWith('b')?1:0))
    });


    // arrows sound and bg
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
        this.sound.play("ui_click");
        let next = this.gameState.bg + 1 > this.gameState.bgtotal-1 ? 0 : this.gameState.bg + 1;
        this["bg" + (this.gameState.bg+1)].setVisible(false);
        this["bg" + (next+1)].setVisible(true);
        this.gameState.bg = next;
      });


    this.sound.pauseOnBlur = false;
    this.music = this.sound.add("music");
    this.music.loop = true;
    this.music.play();

    this.btndone = this.add.panel(280, 410, "sm", 4, 2, 'done').setVisible(false).onClick(() => {
      this.sound.play("ui_click");
      this.speechbox.setName("Gail");
      if (!this.gameState.gail.top) {
        this.speechbox.run("This sweater doesn't feel appropriate for the occasion");
        return;
      }
      if (this.gameState.gail.top===3) {
        this.speechbox.run("Who the hell wears an old school uniform to a funeral?");
        return;
      }
      if (this.gameState.mom===4 && this.gameState.mombottom === 2) {
        this.speechbox.run("I don't think mom would have understood this joke.");
        return;
      }
      setTimeout(() => {
        this.speechbox.run("It seems we're ready.", undefined, ()=>this.speechbox.run("Just one last thing to do."));
        setTimeout(() => {
          this.abigail.destroy();
          setTimeout(() => {
            this.initHand();
          }, 500);
        }, 7000);
      }, 2000);
    });


    this.speechbox = this.add.speechbox();
    this.onNavClicked("hair");
    this.cameras.main.fadeIn(500, 0, 0, 0);
  }
  changePreview = (direction) => {
    this.sound.play("ui_click");
    const char = this.gameState.currentChar;
    const section = this.gameState.currentSection;
    const current = this.gameState[char][section+"preview"];

    const total = this.gameState[char][section + "total"];
    const newIndex = direction === "next"
        ? (current + 2 < total ? current + 2 : 0)
        : (current === 0 ? total - 2 : current - 2);

    this.gameState[char][section+"preview"] = newIndex;
    this.previews[char+section+'t'].setFrame(newIndex);
    this.previews[char+section+'b'].setFrame(newIndex+1);

    if (!this.gameState.btnChangeChar && section === "bottom" && current === 0) {
        this.arrowgail.setVisible(true);
    }
    this.checkChange("preview");
  }
  checkChange(type) {
    return
    phrases[type].forEach((ph) => {
      let show;
      if (type === "preview") {
        if (this.gameState[ph.on[0]][ph.on[1]+'preview']===ph.on[2]) {
          show = true;
        }
      } else {
        if (
          ph.on[0] === this.gameState.currentChar &&
          ph.on[1] === this.gameState.currentSection &&
          this.gameState[ph.on[0]][ph.on[1]] === ph.on[2]
        ) {
          show = true;
        }
      }
      if (show) {
        function cap(val) {
          return String(val).charAt(0).toUpperCase() + String(val).slice(1);
        }      
        const arr = ph.text.map(str=>({character:cap(ph.on[0]),text:str}));
        this.speechbox.playDialogSequence(arr);
      }
    });
  }
  onNavClicked(type) {
    if (this.gameState.currentSection !== type) {
      let who = this.gameState.currentChar;
      if (this.gameState.currentSection) {
        this.sound.play("ui_click");
        this.previews[who+this.gameState.currentSection+'t'].setVisible(false);
        this.previews[who+this.gameState.currentSection+'b'].setVisible(false);
      }
      this.previews[who+type+'t'].setVisible(true);
      this.previews[who+type+'b'].setVisible(true);

      let current = this.gameState[who][type];
      if (current % 2 !== 0) { current -= 1 };
      this.previews[who+type+'t'].setFrame(current);
      this.previews[who+type+'b'].setFrame(current+1);
      this.gameState.currentSection = type;
    }
    ["hair","top","bottom"].forEach(section => {
      this[section+'btn'].invertColors(this.gameState.currentSection===section?'on':'off');
    });
    if (
      this.gameState.currentChar === "gail" &&
      this.gameState.currentSection === "bottom"
    ) {
      this.btndone.setVisible(true);
    }
    this.checkChange("preview");
  }
  onPreviewClick(index){
    this.sound.play("ui_click");
    const char = this.gameState.currentChar;
    const section = this.gameState.currentSection;
    const selectedIndex = this.gameState[char][section + "preview"]+index;
    this[char + section].setFrame(selectedIndex);
    this.gameState[char][section] = selectedIndex;
    this.checkChange("click");
  }
  changeChar() {
    this.sound.play("ui_click");
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
