import phrases from "../phrases.json";

export default class Main extends Phaser.Scene {
  constructor() {
    super("Main");
    this.gameState = {};
  }
  create() {
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
        hair:0, hairpreview:0, hairtotal: 6,
        top:0, toppreview:0, toptotal: 7, choice: null,
        bottom:0, bottompreview:0, bottomtotal: 4,
      }
    };
    phrases.preview.forEach(p=>p.skip=false);
    phrases.click.forEach(p=>p.skip=false);

    Array.from({ length: 4 }, (_, i) => i + 1).forEach((i) => {
      this["bg" + i] = this.add
        .sprite(640, 480, "bg" + i)
        .setVisible(i > 1 ? false : true)
        .setPosition(320, 240);
    });
    this.dump = this.add.group();
    // left side UI
    this.hairbtn = this.add.panel(20, 100, "md", 20).setSize(3,2).setText("Hair").onClick(() => {
      this.onNavClicked("hair");
    });
    this.topbtn = this.add.panel(20, 180, "md", 20).setSize(3,2).setText("Tops").onClick(() => {
      this.onNavClicked("top");
    });
    this.bottombtn = this.add.panel(20, 260, "md", 18).setSize(3,2).setText("Bottoms").onClick(() => {
      this.onNavClicked("bottom");
    });
    this.dump.add(this.add.panel(20, 340, 'sm').setSize(6, 2).setText("Background").onClick(() => {
      this.sound.play("ui_click");
      let next = this.gameState.bg + 1 > this.gameState.bgtotal-1 ? 0 : this.gameState.bg + 1;
      this["bg" + (this.gameState.bg+1)].setVisible(false);
      this["bg" + (next+1)].setVisible(true);
      this.gameState.bg = next;
    }),true)
    this.arrowgail = this.add.arrowpanel(20, 400, 6, "Gail").setVisible(false).onClick(()=>this.changeChar());
    this.arrowmom = this.add.arrowpanel(20, 400, 6, "Mom", "left").setVisible(false).onClick(()=>this.changeChar());
    //

    // right side UI
    this.dump.addMultiple([
      this.add.panel(500, 80, "md").setSize(3, 4).invertColors(),
      this.add.panel(500, 240, "md").setSize(3, 4).invertColors()
    ], true);

    // MOM
    this.add.image(250, 248, "bodies", "mother");
    this.eyes = this.add.image(261, 73, "bodies", "eyes").setVisible(false);
    
    this.mombottom = this.add.image(248, 345,'mombottom',0);
    this.momtop = this.add.image(240, 284,'momtop',0);
    this.momhair = this.add.image(239, 99,'momhair',0);

    // GAIL
    this.abigail = this.add.image(383, 258, "bodies", "abigail");
    this.gailbottom = this.add.image(371, 309,'gailbottom',0);
    this.gailtop = this.add.image(388, 261,'gailtop',0);
    this.gailhair = this.add.image(376, 108,'gailhair',0);

    this.previews = {
      momhairt: this.add.image(555, 150,'momhair',0).setScale(0.7),
      momhairb: this.add.image(555, 310,'momhair',1).setScale(0.7),
      momtopt: this.add.image(555, 200,'momtop',0).setCrop(0,0,216,200).setScale(0.6),
      momtopb: this.add.image(555, 360,'momtop',1).setCrop(0,0,216,200).setScale(0.6),
      mombottomt: this.add.image(566, 160,'mombottom',0).setScale(0.6),
      mombottomb: this.add.image(566, 320,'mombottom',1).setScale(0.6),
      gailhairt: this.add.image(585, 170,'gailhair',0).setCrop(0,0,120,150).setScale(0.9),
      gailhairb: this.add.image(585, 330,'gailhair',1).setCrop(0,0,120,150).setScale(0.9),
      gailtopt: this.add.image(550, 190,'gailtop',0).setCrop(50,0,200,200).setScale(0.66),
      gailtopb: this.add.image(550, 350,'gailtop',1).setCrop(50,0,200,200).setScale(0.66),
      gailbottomt: this.add.image(560, 170,'gailbottom',0).setScale(0.55),
      gailbottomb: this.add.image(560, 330,'gailbottom',1).setScale(0.55),
    };
    Object.keys(this.previews).forEach((k) => {
      this.previews[k].setInteractive({ cursor: "pointer" });
      this.previews[k].setVisible(false);
      this.previews[k].on('pointerdown', ()=>this.onPreviewClick(k.endsWith('b')?1:0))
    });

    this.chooseBtn = this.add.panel(510, 270, "sm").setSize(5,5).setText("Check Gail's old clothes").setVisible(false).onClick(() => {
      const setTop = (type) => {
        this.gameState.gail.choice= type;
        if (this.gameState.currentChar==='gail'&&this.gameState.currentSection==='top'&&this.gameState.gail.toppreview===2) {
          this.chooseBtn.setVisible(false);
          this.previews.gailtopb.setFrame(type === "winter" ? 3 : 4).setVisible(true);
        }
        this.onPreviewClick(1)
      }
      this.speechbox.playDialogSequence([{text:"Buried in the pile was something from the past."},
        {text:"Something that felt like...", options: [
          {text:'The summer sea',response: [{character:"Gail",text:"You got me this sailor shirt after I told you I'd leave for the sea one day. It used to be so big on me."}],callback:()=>setTop('summer'),after: "response-continue"},
          {text:'The winter sea',response: [{character:"Gail",text:"My old wool sweater."},{character:"Gail",text:"You picked the warmest one you could find, even though you never understood why I wanted to be near the sea even in the cold."}],callback:()=>setTop('winter'),after: "response-continue"},
      ]}]);
    });


    // arrows and sound 
    this.dump.add(this.add
      .sprite(530, 420, "ui_atlas", "arrow-solo")
      .setFlipX(true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => this.changePreview("prev")), true);
    this.dump.add(this.add
      .sprite(590, 420, "ui_atlas", "arrow-solo")
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => this.changePreview("next")), true);

    this.dump.add(this.add.soundbutton(),true);

    this.sound.pauseOnBlur = false;
    this.music = this.sound.add("music");
    this.music.loop = true;
    this.music.play();

    this.btndone = this.add.panel(280, 410, "sm").setSize(4,2).setText('done').setVisible(false).onClick(() => {
      this.sound.play("ui_click");
      this.speechbox.setName("Gail");
      if ([3,4].includes(this.gameState.gail.top)) {
        this.speechbox.run("This colour doesn't feel appropriate for the occasion");
        return;
      }
      if (this.gameState.momtop===9 && this.gameState.mombottom === 2) {
        this.speechbox.run("I don't think mom would have understood this joke");
        return;
      }
      [
        this.arrowgail,this.arrowmom,
        this.hairbtn,this.topbtn,this.bottombtn,
        this.btndone,this.chooseBtn,
      ].forEach(o=>o.destroy());
      Object.values(this.previews).forEach(p=>p.destroy());
      this.dump.clear(true,true)

      this.time.delayedCall(1000, ()=>{
        this.speechbox.run("It seems we're ready.", undefined, ()=>{this.speechbox.run("Just one last thing to do.", undefined, ()=>{
          [this.abigail,this.gailhair,this.gailtop,this.gailbottom].forEach(o=>o.destroy());
          this.initHand();
        })});
      });
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

    this.previews[char + section + 'b'].setVisible(true);
    this.chooseBtn.setVisible(false);

    let newIndex = direction === "next" ? (current + 2 < total ? current + 2 : 0) : (current === 0 ? total - 2 : current - 2);
    if (char==='gail'&&section==='top') {
      if (direction === "next"&&current === 2) {
        newIndex = 5;
      } else if (direction === "prev"&&current === 5) {
        newIndex = 2;
      }
      this.chooseBtn.setVisible(!this.gameState.gail.choice&&newIndex===2);
      this.previews[char + section + 'b']
        .setFrame(newIndex === 2 ? (this.gameState.gail.choice === "winter" ? 3 : 4):(newIndex+1))
        .setVisible(this.gameState.gail.choice||newIndex !== 2)
    } else {
      this.previews[char + section + 'b'].setFrame(newIndex+1);
    }
    this.gameState[char][section + "preview"] = newIndex;
    this.previews[char + section + 't'].setFrame(newIndex);

    if (!this.gameState.btnChangeChar && section === "bottom" && current === 0) {
        this.arrowgail.setVisible(true);
        this.gameState.btnChangeChar = true;
    }
    this.checkChange("preview");
  }
  checkChange(type) {
    phrases[type].filter(ph=>!ph.skip).forEach((ph) => {
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
        ph.skip = true;
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
      let current = who==='gail'&&type==='top' ? 0 : this.gameState[who][type];
      if (current % 2 !== 0) { current -= 1 };
      this.gameState[who][type+ "preview"] = current;
      this.previews[who+type+'t'].setFrame(current);
      this.previews[who+type+'b'].setFrame(current+1);
      this.gameState.currentSection = type;
      this.chooseBtn.setVisible(false);
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
    const preview = this.gameState[char][section + "preview"];
    const selectedIndex = (char==='gail'&&section==='top'&&preview===2&&index) ? (this.gameState.gail.choice === "winter" ? 3 : 4) : (preview+index);
    this[char + section].setFrame(selectedIndex);
    this.gameState[char][section] = selectedIndex;
    if (section === "top") {
      if (char === "gail") {
          if (selectedIndex === 6 && this.gameState.mom.top === 0) {
              this.gameState.mom.top = 1; 
              this.momtop.setFrame(1);
          } else if (selectedIndex === 5 && this.gameState.mom.top === 8) {
              this.gameState.mom.top = 1; 
              this.momtop.setFrame(1);
          }
      } else {
          if (selectedIndex === 0 && this.gameState.gail.top === 6) {
              this.gameState.gail.top = 1; 
              this.gailtop.setFrame(1);
          } else if (selectedIndex === 8 && this.gameState.gail.top === 5) {
              this.gameState.gail.top = 1;
              this.gailtop.setFrame(1);
          }
      }
    }
    this.checkChange("click");
  }
  changeChar() {
    this.sound.play("ui_click");
    Object.keys(this.previews).forEach((k) => (this.previews[k].setVisible(false)));
    this.gameState.currentSection = null;
    this["arrow" + this.gameState.currentChar].setVisible(true);
    this.gameState.currentChar = this.gameState.currentChar == "mom" ? "gail" : "mom";
    this["arrow" + this.gameState.currentChar].setVisible(false);
    this.onNavClicked("hair");
    this.checkChange("preview");
  }
  initHand() {
    let ending;
    let mom = this.gameState.mom;
    if ([8,9].includes(mom.hair) || [3,4,5].includes(mom.top)) {
      ending = 1; //present
    } else if ([2,11].includes(mom.hair) || [6].includes(mom.top)) {
      ending = 2; //past
    } else if (
      [
        [3,6,7].includes(mom.hair),
        [1,2,7,8].includes(mom.top),
        [1, 4].includes(mom.bottom),
      ].filter(Boolean).length > 1
    ) {
      ending = 2;
    } else {
      ending = 1;
    }
    this.hand = this.add.image(330, 65, "bodies", "hand").setInteractive({ cursor: "pointer" });
    this.hand.once("pointerdown", () => {
      this.music.pause();
      this.tweens.add({
        targets: this.hand,
        x: this.hand.x - 50,
        duration: 600,
      });
      this.time.delayedCall(1000, ()=>{
        this.tweens.add({
          targets: this.hand,
          y: this.hand.y + 20,
          duration: 400,
        });
        this.eyes.visible = true;
      });
      this.time.delayedCall(2000, ()=>{
        this.tweens.add({
          targets: this.hand,
          x: this.hand.x + 50,
          duration: 1000,
          onComplete: () => {
            this.time.delayedCall(1000, ()=>this.scene.start("Ending", {seek:this.music.seek,ending}))
          },
        });
      });
    });
  }
}
